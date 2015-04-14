var express     = require('express'),
    bodyParser  = require('body-parser'),
    routes      = require('./routes'),
    http        = require('http'),
    fs          = require('fs');


fs.realpath(__dirname + '/../', function (err, projectRoot) {
    var app = express(); // Make app using Express framework
    app.set('port', process.env.PORT || 3000);
    app.set('env', process.env.NODE_ENV || 'development');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    routes(app);
    
    app.set('views', projectRoot + '/server/views');
    app.set('view engine', 'jade');
    app.use(require('serve-static')(projectRoot + '/client/vendor'));
    app.use(require('serve-static')(projectRoot + '/client/src'));
    app.use(require('serve-static')(projectRoot + '/client/partials'));
    app.use(require('serve-static')(projectRoot + '/client/styles'));


    var server = http.createServer(app);

  server.listen(app.get('port'), function(){
    console.log("Listening on port " + app.get('port') + " in "+ app.get('env') + " mode");
    console.log(projectRoot);
  });

module.exports = app;
});
