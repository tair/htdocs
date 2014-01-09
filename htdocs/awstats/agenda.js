//////////////////// Agenda file for CalendarXP 9.0 /////////////////
// This file is totally configurable. You may remove all the comments in this file to minimize the download size.
/////////////////////////////////////////////////////////////////////

//////////////////// Define agenda events ///////////////////////////
// Usage -- fAddEvent(year, month, day, message, action, bgcolor, fgcolor, bgimg, boxit, html, etc);
// Note:
// 1. the (year,month,day) identifies the date of the agenda event.
// 2. the message param will be shown as tooltip and in the status bar.
// 3. setting the action param to null will disable that date with a line-through effect.
// 4. bgcolor is the background color.
// 5. fgcolor is the font color. Setting it to ""(empty string) will hide the date.
// 6. bgimg is the url of the background image file in use with the specific date.
// 7. if boxit is set other than false or null value, the date will be drawn in a box using boxit value as the color, or bgcolor if boxit is true.
// 8. html is the HTML string to be injected into the agenda cell, e.g. an <img> tag.
// 9. etc is any object you would like to associate with the date, so that you can retrieve it later via the fGetEvent().
// ** REMEMBER to unlock corresponding bits of the gAgendaMask option in the theme.
/////////////////////////////////////////////////////////////////////

// fAddEvent(2003,12,2," Click me to active your email client. ","popup('mailto:any@email.address.org?subject=email subject')","#87ceeb","dodgerblue",null,true);
// fAddEvent(2004,9,23, "Hello World!\nYou can't select me.", null, "#87ceeb", "dodgerblue");




///////////// Recurring Events /////////////////////////
// fHoliday() provides you a flexible way to create recurring events easily.
// Once defined, it'll be used by the calendar engine to render each date cell.
// An agenda array [message, action, bgcolor, fgcolor, bgimg, boxit, html, etc] 
// is expected as return value, which are similar to the params of fAddEvent().
// Returning null value will result in default style as defined in the theme.
// ** REMEMBER to unlock corresponding bits of the gAgendaMask option in the theme.
////////////////////////////////////////////////////////
function fHoliday(y,m,d) {
	var rE=fGetEvent(y,m,d), r=null;

	// you may have sophisticated holiday calculation set here, following are only simple examples.
	if (m==1&&d==1)
		r=[" Jan 1, "+y+" \n Happy New Year! ",gsAction,"skyblue","red"];
	else if (m==12&&d==25)
		r=[" Dec 25, "+y+" \n Merry X'mas! ",gsAction,"skyblue","red"];
	else if (m==7&&d==1)
		r=[" Jul 1, "+y+" \n Canada Day ",gsAction,"skyblue","red"];
	else if (m==7&&d==4)
		r=[" Jul 4, "+y+" \n Independence Day ",gsAction,"skyblue","red"];
	else if (m==11&&d==11)
		r=[" Nov 11, "+y+" \n Veteran's Day ",gsAction,"skyblue","red"];
	else if (m==1&&d<25) {
		var date=fGetDateByDOW(y,1,3,1);	// Martin Luther King, Jr. Day is the 3rd Monday of Jan
		if (d==date) r=[" Jan "+d+", "+y+" \n Martin Luther King, Jr. Day ",gsAction,"skyblue","red"];
	}
	else if (m==2&&d<20) {
		var date=fGetDateByDOW(y,2,3,1);	// President's Day is the 3rd Monday of Feb
		if (d==date) r=[" Feb "+d+", "+y+" \n President's Day ",gsAction,"skyblue","red"];
	}
	else if (m==9&&d<15) {
		var date=fGetDateByDOW(y,9,1,1);	// Labor Day is the 1st Monday of Sep
		if (d==date) r=[" Sep "+d+", "+y+" \n Labor Day ",gsAction,"skyblue","red"];
	}
	else if (m==10&&d<15) {
		var date=fGetDateByDOW(y,10,2,1);	// Thanksgiving is the 2nd Monday of October
		if (d==date) r=[" Oct "+d+", "+y+" \n Thanksgiving Day (Canada) ",gsAction,"skyblue","red"];
	}
	else if (m==11&&d>15) {
		var date=fGetDateByDOW(y,11,4,4);	// Thanksgiving is the 4th Thursday of November
		if (d==date) r=[" Nov "+d+", "+y+" \n Thanksgiving Day (U.S.) ",gsAction,"skyblue","red"];
	}
	else if (m==5&&d>20) {
		var date=fGetDateByDOW(y,5,5,1);	// Memorial day is the last Monday of May
		if (d==date) r=[" May "+d+", "+y+" \n Memorial Day ",gsAction,"skyblue","red"];
	}

	
	return rE?rE:r;	// favor events over holidays
}


