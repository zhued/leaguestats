var express     = require('express'),
    bodyParser  = require('body-parser'),
    routes      = require('./routes'),
    path        = require('path');

var app = express();

var http = require('http').Server(app);

app.use(express.static('client'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'development');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

http.listen(app.get('port'), function(){
  console.log("Listening on port " + app.get('port') + " in "+ app.get('env') + " mode");
});

module.exports = app;
