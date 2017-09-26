// Capital month
var CAP_MONTHS = [ false, false, false, true, false, true, false, false, true, false, true, false ];
var MONTH_ABBR = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
var MONTH = [
	"January", "February", "March", "April"
	, "May", "June", "July", "August"
	, "September", "October", "November", "December"
];
var DAY_ABBR = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
var DAY = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

var getOrdinalSuffix = function(day)
{
	if( day < 1 || 31 < day )
		throw new Error( "Day is out of range 1 <= day <= 31" );

	if ( day == 1 || day == 21 || day == 31 ) return "st";
	else if ( day == 2 || day == 22 ) return "nd";
	else if ( day == 3 || day == 23 ) return "rd";
	return "th";
};

module.exports = {
	date_pretty: function( dateObj, plain )
	{
		return dateObj.getDate()
			+ ( plain ? "" : "<sup>" )
			+ getOrdinalSuffix( dateObj.getDate() )
			+ ( plain ? " " : "</sup> " )
			+ MONTH[ dateObj.getMonth() ]
			+ ", "
			+ dateObj.getFullYear()
		;
	}
	, date_bMon: function( date ) { return MONTH[ date.getMonth() ]; }
	, date_sDay: function( date ) { return DAY_ABBR[ date.getDay() ]; }
	, date_short: function( date )
	{
		// Rearrange the date format
		var d = date.toDateString().split( " " );
		// ddd dd mmm yyyy
		return d[2] + " " + d[1] + " " + d[3] + " " + d[0];
	}
	, date_comment: function( date )
	{
		var d = date.toDateString().split( " " );
		var t = date.toTimeString().split( ":" );
		var ampm = "AM";
		var h = Number( t[0] );
		if( 12 <= h )
		{
			ampm = "PM";
			if( h != 12 ) h -= 12;
		}

		// h:mm AM/PM dd mmm, yyyy
		return h + ":" + t[1] + " " + ampm
			+ " " + d[1] + " " + d[3] + ", " + d[2] + " " + d[0];
	}
	, date_tzISODate: function( date )
	{
		var tzo = new Date().getTimezoneOffset() * 6e4;
		var ndate = new Date( date.getTime() - tzo );
		return ndate.toISOString().split( "T" )[0];
	}
};
