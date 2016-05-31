var cl = global.botanLoader;
var WebParam = cl.load( "botanss.utils.WebParam" );
var ReadStream = require( "stream" ).Readable;

var qstr = require( "./querystr.js" );

module.exports = {
	form_multipart: function( boundary, request, handler )
	{
		boundary = new Buffer( "--" + boundary );
		var delim = new Buffer( "0D0A0D0A", "hex" );
		var endBuff = new Buffer( "2D2D0D0A", "hex" );

		var st = request.resultStream();
		var firstRead = true;

		var tarBuff = null;
		var content = [[]];

		var i = 0;
		var ring = 0;

		st.addListener( "readable", function()
		{
			if( firstRead )
			{
				firstRead = false;
				var r = st.read( boundary.length, "hex" );
				if( !r.equals( boundary ) )
					throw new Error( "Invalid form input" );
			}

			// Read them byte by byte
			while( ( r = st.read( 1, "hex" ) ) !== null )
			{
				switch( ring )
				{
					case 0:
						tarRBuff = delim;
						nextRing = 1;
					break;

					case 1:
						tarRBuff = boundary;
						nextRing = 0;
					break;
				}

				if( tarBuff )
				{
					content[ i ].push( tarBuff[0] );
					tarBuff = Buffer.concat([ tarBuff.slice( 1 ), r ]);
				}
				else
				{
					tarBuff = Buffer.concat([ r, st.read( tarRBuff.length - 1, "hex" ) ]);
				}

				if( tarBuff.equals( tarRBuff ) )
				{
					i ++; content[ i ] = [];
					ring = nextRing;
					tarBuff = null;
				}
			}

		} );

		st.addListener( "end", function()
		{
			if( !tarBuff.equals( endBuff ) )
			{
				throw new Error( "Invalid form data" );
			}

			content = content.map( ( v ) => new Buffer( v ) );

			var item;
			var formData = [];

			var l = content.length;

			for( var i = 0; i < l; i ++ )
			{
				if( i % 2 == 0 )
				{
					item = {};
					content[i].toString().split( "\r\n" ).forEach(
					function( v )
					{
						if( !v ) return;
						v = v.split( ":" );
						item[ v[0] ] = new WebParam( v[1] );
					} );
				}
				else
				{
					// the -2 is the last 0D0A
					item.file = {
						content: new ReadStream()
						, size: content[i].length - 2
					};
					item.file.content._read = function(){};

					setTimeout(
						function()
						{
							this.f.push( this.c.slice( 0, -2 ) );
							this.f.push( null );
						}.bind({ f: item.file.content, c: content[i] })
					, 0 );

					formData.push( item );
				}
			}

			handler( formData );
		} );
	}
};
