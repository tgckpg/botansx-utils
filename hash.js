var crypto = require( "crypto" );

module.exports = {
	md5: function( str )
	{
		var md5 = crypto.createHash( "md5" );
		md5.update( str );
		return md5.digest( "hex" );
	}
	, sha1: function( str )
	{
		var sha1 = crypto.createHash( "sha1" );
		sha1.update( str );
		return sha1.digest( "hex" );
	}
};
