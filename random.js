"use strict";

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charLen = charset.length;

var lut = []; for ( var i=0; i<256; i++ ) { lut[i] = (i<16?'0':'')+(i).toString(16); }

module.exports = {
	uuid: function()
	{
		var d0 = Math.random()*0xffffffff|0;
		var d1 = Math.random()*0xffffffff|0;
		var d2 = Math.random()*0xffffffff|0;
		var d3 = Math.random()*0xffffffff|0;
		return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
			lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
			lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
			lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
	}
	, randstr: function( len )
	{
		if( !len ) len = 16;

		var str = "";
		for( var i = 0; i < len; i ++ )
		{
			var d0 = Math.random()*0xffffffff|0;

			str += charset[ ( d0 & 0xff ) % charLen ];
			if( ++ i < len ) str += charset[ ( d0 >> 8 & 0xff ) % charLen ];
			if( ++ i < len ) str += charset[ ( d0 >> 16 & 0xff ) % charLen ];
			if( ++ i < len ) str += charset[ ( d0 >> 24 & 0xff ) % charLen ];
		}

		return str;
	}
};
