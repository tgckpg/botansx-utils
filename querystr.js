var cl = global.botanLoader;
var CondStream = cl.load( "botanss.utils.CondStream" );

module.exports = {
	queryStr: function( qstr )
	{
		var qObj = {};

		if( qstr instanceof CondStream ) qstr = qstr.toString();

		qstr.split( "&" ).forEach( function( val )
		{
			val = val.split( "=" );
			qObj[ val[0] ] = val[1] ? decodeURIComponent( val[1].replace( /\+/g, " " ) ) : "";
		} );

		return qObj;
	}
};
