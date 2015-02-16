var Hapi = require('hapi');
var exec = require('child_process').exec;
var fs   = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

// ***
// Create hapi server on port 8000
// ***
var server = new Hapi.Server('localhost', '8000');

if(!module.parent){ //prevent server from starting when testing
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
}

// ***
// Static page handler for react.js located in public folder.
// ***
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});

// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({extended: true}));



function get_data(name,request, callback){  
  exec("python ../api_requests/data.py "+name+" " + request , function(err,stdout,stderr){
    data = JSON.parse(stdout);
    callback(data);
  });  
}

server.route({
  method: 'GET',
  path:   '/{name}/id', 
  handler: function(req,res){
    var name = encodeURIComponent(req.params.name);
    get_data(name,'get_summoner', function(data){
      res(data.id);
    })
  }
});

server.route({
  method: 'GET',
  path:   '/{name}/matchhistory', 
  handler: function(req,res){
    var name = encodeURIComponent(req.params.name);
    get_data(name,'get_match_history', function(data){
      res(data);
    })
  }
});

server.route({
  method: 'GET',
  path:   '/{name}/average_stats', 
  handler: function(req,res){
    var name = encodeURIComponent(req.params.name);
    get_data(name,'get_average_stats', function(data){
      res(data);
    })
  }
});


