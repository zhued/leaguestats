var Hapi = require('hapi');
var exec = require('child_process').exec;
var fs   = require('fs');

var server = new Hapi.Server('0.0.0.0', '8000');

if(!module.parent){ //prevent server from starting when testing
  server.start();
  console.log('Server Started On localhost:8000');
}



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