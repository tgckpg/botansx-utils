var cloneObj = function( o )
{
	if ( o == null || typeof o != "object" ) return o;

	var clone = {};

	if ( o instanceof Date )
	{
		clone = new Date();
		clone.setTime( o.getTime() );
		return clone;
	}

	else if ( o instanceof Array )
	{
		clone = [];

		for ( var i = 0, l = o.length; i < l; i ++ )
		{
			clone[i] = cloneObj( o[i] );
		}

		return clone;
	}

	else if ( o instanceof RegExp )
	{
		clone = new RegExp( o );
		return clone;
	}

	else if ( o instanceof Object )
	{
		for ( var p in o )
		{
			o.hasOwnProperty( p )
				&& ( clone[ p ] = cloneObj( o[ p ] ) );
		}

		return clone;
	}

	throw new Error( "Can't clone object: " + o );
};

var referenceObj = function()
{
	var l = arguments.length;
	if( l == 0 ) return null;

	var ref = arguments[0];
	if( l == 1 ) return ref;

	var refd = {};
	for( var i = 1; i < l; i ++ )
	{
		var prop = arguments[i];
		refd[ prop ] = ref[ prop ];
	}

	return refd;
};

module.exports = {
	clone: cloneObj
	, refObj: referenceObj
};
