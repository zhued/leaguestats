var dotenv  = require('dotenv'), // used for keys -> get from .env
  fs        = require('fs'),
  db     	= require('./mongo.js'),
  mongoose 	= require('mongoose');

var PythonShell = require('python-shell');



mongoose.connection.on('open', function (ref) {
	var arguments = process.argv.slice(2);
	console.log('Connected to mongo server.');
	// Keyword mass will run a mass update on all existing players in database
	if (arguments == "mass") {
	    //trying to get collection names
	    mongoose.connection.db.collectionNames(function (err, names) {
	    	if (err) {
	    		throw err
	    	} else {
		        // console.log(names); // [{ name: 'dbname.myCollection' }]

		        names.forEach(function(arrayItem){
		        	
		        	arrayItem = arrayItem.name.substring(12)
		        	if (!(arrayItem == "system.indexes" || arrayItem == "test" || arrayItem == "datas")) {
		        		console.log(arrayItem)
				        var options = {
							  scriptPath: 'api_requests',
							  args: [arrayItem, 'get_recent_games']
						};

				        PythonShell.run('data.py', options, function (err, times) {
							if (err) throw err;
							
							data = JSON.parse(times);
							console.log(data)
							for (var key in data) {
							    var entry = data[key];
							    Data.create(entry, function(err,doc){
									if(err) throw err;
									// not throwing error because data will overlap, which is fine
								})
							}
							
							// setTimeout(function(){ console.log(arrayItem +' Finished.'); db.DB_close(); }, 500);
						})
		        	}
				})
	    	}
	    });

		setTimeout(function(){ console.log('Mass Update Finished.'); db.DB_close(); }, 500);
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
});
