var dotenv   = require('dotenv'), // used for keys -> get from .env
  fs        = require('fs'),
  db     = require('./mongo.js');
  mongoose = require('mongoose');

var PythonShell = require('python-shell');

var arguments = process.argv.slice(2);

	
// Keyword mass will run a mass update on all existing players in database
if (arguments == "mass") {
	mongoose.connection.on('open', function (ref) {
    	//trying to get collection names
	    mongoose.connection.db.collectionNames(function (err, names) {
	    	if (err) {
	    		throw err
	    	} else {
		        names.forEach(function(arrayItem){
		        	arrayItem = arrayItem.name.substring(12)
		        	// if (!(arrayItem == "system.indexes" || arrayItem == "test" || arrayItem == "datas")) {
		        		if (arrayItem == "dualife" || arrayItem == "somepanda" || arrayItem == "imaqtpie") {
		        		var Data = db.dataInit(arrayItem);

				        var options = {
							  scriptPath: 'api_requests',
							  args: [arrayItem, 'get_recent_games']
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
							setTimeout(function(){ console.log(arrayItem +' Finished.'); db.DB_close(); }, 5000);
						})
		        	}
		        })
	    	}
	    });
    });

	// console.log(db.DB_collections());
	// setTimeout(function(){ console.log('Entry Finished.'); db.DB_close(); }, 500);
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

