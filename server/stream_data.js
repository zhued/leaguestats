var dotenv   = require('dotenv'), // used for keys -> get from .env
  fs        = require('fs'),
  Data     = require('./mongo.js').dataInit('test3'),
  exec = require('child_process').exec;

var arguments = process.argv.slice(2);

console.log(arguments[0])
function get_data(name,request, callback){  
  exec("python api_requests/data.py "+ name + " " + request , function(err,stdout,stderr){
    // console.log(stdout);
    data = stdout;
    console.log(data);
    callback(data);
  });  
}

function get_recent_times() {
	get_data(arguments[0], "get_recent_games", function(data){
		// console.log(typeof(JSON.parse(data)))
		Data.create(JSON.parse(data), function(err,doc){
		if(err) throw err;
		// console.log(data);
		})
	})
	// console.log(data)
	
}

get_recent_times();
// exec("python ../api_requests/data.py "+"GhostNeedle"+" get_recent_games"  )