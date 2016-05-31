var cl = global.botanLoader;

var Loader = function()
{
	for( var i in arguments )
	{
		this.use( arguments[i] );
	}
};

Loader.prototype.use = function()
{
	for( var i in arguments )
	{
		var module = arguments[i];
		var m = require( "./" + module );

		// Link all methods to this
		for( var j in m ) this[ j ] = m[ j ];
	}
};

module.exports = Loader;
