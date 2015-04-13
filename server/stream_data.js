var dotenv   = require('dotenv'), // used for keys -> get from .env
  fs        = require('fs'),
  db     = require('./mongo.js'),
  exec = require('child_process').exec;

var PythonShell = require('python-shell');
// var pyshell = new PythonShell('../api_requests/data.py');

var Data = db.dataInit('test');

var arguments = process.argv.slice(2);


console.log(arguments[0])

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
				console.log(entry);
			})
		}
		
});
