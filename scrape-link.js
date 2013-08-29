var jsdom = require('jsdom');

module.exports = function(date,callback) {

	var jsdom = require("jsdom"),
		setList = [];

	jsdom.env(
	  "http://music.cbc.ca/broadcastlogs/broadcastlogs.aspx?broadcastdate="+date.year+"-"+date.month+"-"+date.day,
	  ["http://code.jquery.com/jquery.js"],
	  function (errors, window) {
	  	var $ = window.$;
	  	var index = 0;
	  	$("#201330"+date.day+"0330").find(".fCm").each(function () {
	      	setList.push({title:$(this).text().trim()}) 
	    });
	    $("#201330"+date.day+"0330").find(".s12 dd:nth-child(2)").each(function () {
	    	setList[index].artist = $(this).text().trim()
	    	if(index===setList.length-1) {
	    		callback(setList, date)
	    	}

	    	index++;
	  	})
	  	// setTimeout(function(){ callback(setList, date)},3000)
	  }
	);
}