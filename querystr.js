var cl = global.botanLoader;
var CondStream = cl.load( "botanss.utils.CondStream" );
var querystr = require( "querystring" );

module.exports = {
	queryStr: function( qstr )
	{
		if( qstr instanceof CondStream ) qstr = qstr.toString();
		return querystr.parse( qstr );
	}
};
