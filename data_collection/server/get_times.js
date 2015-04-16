var dotenv   = require('dotenv'), // used for keys -> get from .env
  fs        = require('fs'),
  db     = require('./mongo.js');
  mongoose = require('mongoose');

var PythonShell = require('python-shell');

var arguments = process.argv.slice(2);
// console.log(arguments[0])

function push_data_to_mongo (player) {
	var Data = db.dataInit('games');
    var options = {
		  scriptPath: 'api_requests',
		  args: [player, 'get_recent_games']
	};
	
	PythonShell.run('data.py', options, function (err, times) {
		if (err) throw err;
		
		data = JSON.parse(times);
		// console.log(data)
		for (var key in data) {
		    var entry = data[key];
		    Data.create(entry, function(err,doc){
				// if(err) throw err;
				// not throwing error because data will overlap, which is fine
			})
		}
		console.log(player + " Finished.")
		// setTimeout(function(){ console.log(player +' Finished.'); db.DB_close(); }, 5000);
	})
}

function push_name_to_mongo (player) {
	var Data = db.dataInit('summoners');
    var options = {
		  scriptPath: 'api_requests',
		  args: [player, 'get_summoner_formated']
	};
	
	PythonShell.run('data.py', options, function (err, times) {
		if (err) throw err;
		
		data = JSON.parse(times);
		// console.log(data)
		for (var key in data) {
		    var entry = data[key];
		    Data.create(entry, function(err,doc){
				// if(err) throw err;
				// not throwing error because data will overlap, which is fine
			})
		}
		console.log(player + " name recorded.")
		// setTimeout(function(){ console.log(player +' Finished.'); db.DB_close(); }, 5000);
	})
}

	
// Keyword mass will run a mass update on all existing players in database
if (arguments == "mass") {
	var Data = db.dataInit('summoners');
	Data.find({},function(err,summoners){
		var limit = summoners.length;
		var counter = 0;
		names_string = JSON.stringify(summoners);
		names = JSON.parse(names_string);

		function next(){
			if(counter++ < limit) {
				// console.log(counter)
				var arrayItem = names[counter-1].summoner_name
				format_lowercase = arrayItem.toLowerCase();
				sum_name = format_lowercase.replace(/\s/g, '');
				console.log("Processing: " + sum_name)
        		push_data_to_mongo(sum_name);
				setTimeout(next, 4000)
			}
		}
		next()
	})
	// setTimeout(function(){ console.log('Finished.'); db.DB_close(); }, 3000);
} else { // Otherwise, just update the player given
	push_name_to_mongo(arguments[0]);
	push_data_to_mongo(arguments[0]);
	setTimeout(function(){ console.log('Finished.'); db.DB_close(); }, 4000);
}

