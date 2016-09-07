module.exports = {
	array_col: function( arr, name )
	{
		var colArr = [];
		if( name === undefined )
		{
			for( var i in arr )
			{
				var o = arr[i];
				colArr.push( o[ Object.keys( o )[0] ] );
			}
		}
		else
		{
			for( var i in arr )
			{
				colArr.push( arr[i][ name ] );
			}
		}
		return colArr;
	}

	// join exclude
	, joinx: function( glue, arr, exclude )
	{
		var namedArr = false;
		if( arr.length == 2
			&& typeof( arr[0] ) == "string"
			&& typeof( arr[1] ) == "object" )
		{
			namedArr = arr[0];
			arr = arr[1];
		}

		var exMatch = [];
		if( typeof( exclude ) == "string" )
		{
			exMatch.push( exclude );
		}
		else if( typeof( exclude ) == "object" )
		{
			exMatch.push( exclude[ namedArr ] );
		}
		else if( typeof( exclude ) == "array" )
		{
			if( namedArr )
			{
				for( var i in exclude )
				{
					exMatch.push( exclude[i][ namedArr ] );
				}
			}
			else
			{
				exMatch = exclude
			}
		}

		var gluedStr = "";
		if( namedArr )
		{
			for( var i = 0, l = arr.length; i < l; i ++ )
			{
				if( exMatch.indexOf( arr[i][ namedArr ] ) < 0 )
				{
					gluedStr += arr[i][ namedArr ] + "+";
				}
			}
		}
		else
		{
			for( var i = 0, l = arr.length; i < l; i ++ )
			{
				if( exMatch.indexOf( arr[i] ) < 0 )
				{
					gluedStr += arr[i] + "+";
				}
			}
		}

		return gluedStr.substr( 0, gluedStr.length - 1 );
	}

	, arrTrimFilter: function( arr )
	{
		return Array.from( arr, x => x.trim() ).filter( x => x );
	}
};
