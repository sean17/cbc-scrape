var request = require('request'),
	qs		= require('querystring'),
	password= require('./password'),
	fs		= require('fs');


module.exports = function(songs, date) {
	function parseSongs() {
		for (var i = 0; i < songs.length; i++) {
			(function(){
				var index = i;
				searchSong(songs[index])				
			})()
		};
	}
	function searchSong(song) {
		request.get('http://ex.fm/api/v3/song/search/'+song.title, function(err, response){
			if(response){
				var body = JSON.parse(response.body)
				if(body.songs) {
					for (var i = 0; i < body.songs.length; i++) {
						song.artist = song.artist.toLowerCase();
						artist = body.songs[i].artist;
						if(artist) {
							artist = artist.toLowerCase();
						}
						if(artist===song.artist) {
							likeSong(body.songs[i])
							i = body.songs.length;
							return;
						}	
						if(i > body.songs.length-2 && i < body.songs.length) {
							logResults(song, 'failure')
						}
					};
				}
			}
		})
	}
	function likeSong(song) {
		logResults(song, 'success')
		request.post({
  			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url:     'http://ex.fm/api/v3/song/'+song.id+'/love',
			body:   qs.stringify(password)
		}, function(error, response){
			var body = JSON.parse(response.body)
			  console.log(body["status_code"]);
			  console.log(body["status_text"])
		});
	}
	function logResults(song, section) {
		var fileName = "results/"+date.month+"_"+date.day+"_"+date.year+"-results.json";
		fs.appendFile(fileName, JSON.stringify({song: song.title, artist: song.artist,status: section})+",\n", function (err) {
		  if (err) throw err;
		  console.log('Something added to the file');
		});
	}
	parseSongs()
}
