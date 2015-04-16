var dotenv   = require('dotenv'), // used for keys -> get from .env
  db     = require('../server/mongo.js');
  mongoose = require('mongoose');

var inputData = db.dataInit("games")
var outputData = db.dataInit("games_processed")

inputData.find({}, function(err,games){
	console.log(games[0].timePlayed)
})