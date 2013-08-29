var scrapeCBC = require('./scrape-link.js'),
	exfm      = require('./exfm-request.js');//,
// 	schedule = require('node-schedule'),
// 	rule = new schedule.RecurrenceRule();

// rule.dayOfWeek = [1, new schedule.Range(2, 5)];
// rule.hour = 18;
// rule.minute = 06;

// var j = schedule.scheduleJob(rule, function(){
    var date = new Date();
    var cbcDate = {year:date.getFullYear(), month:date.getMonth()+1,day:date.getDate()}
    console.log('Starting the scraper for the day!')
    scrapeCBC(cbcDate,exfm)
// });