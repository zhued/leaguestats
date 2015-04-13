var dotenv   = require('dotenv'), // used for keys -> get from .env
  fs        = require('fs'),
  db     = require('./mongo.js');

var PythonShell = require('python-shell');

var arguments = process.argv.slice(2);

// Keyword mass will run a mass update on all existing players in database
if (arguments == "mass") {
	// console.log(db.DB_collections());


	setTimeout(function(){ console.log('Entry Finished.'); db.DB_close(); }, 500);
} else { // Otherwise, just update the player given

	var Data = db.dataInit(arguments[0]);
	// var Data = db.dataInit('test');

	var options = {
	  scriptPath: 'api_requests',
	  args: [arguments[0], 'get_recent_games']
	};
	 
	PythonShell.run('data.py', options, function (err, times) {
		if (err) throw err;
		data = JSON.parse(times);
		for (var key in data) {
		    var entry = data[key];
		    Data.create(entry, function(err,doc){
				// if(err) throw err;
				// not throwing error because data will overlap, which is fine
			})
		}
		
		setTimeout(function(){ console.log('Entry Finished.'); db.DB_close(); }, 500);
	});
}

