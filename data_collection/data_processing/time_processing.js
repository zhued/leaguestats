var dotenv   = require('dotenv'), // used for keys -> get from .env
  db     = require('../server/mongo.js');
  mongoose = require('mongoose'),
  getTemplate = require('./getTemplate.js');

var inputData = db.dataInit("games")
var outputData = db.dataInit("games_processed")

inputData.find({}, function(err,games){
	games = JSON.stringify(games);
	games = JSON.parse(games);

  	template = getTemplate.getTemplate();
  	// console.log(template)

	for(var index in games){
		game = games[index]
		timePlayed = game.timePlayed
		gameEndtime = game.gameEndtime
		summonerId = game.summoner_id
		gameStartTime = gameEndtime - (timePlayed * 1000);

		startDate = new Date(gameStartTime);
		endDate = new Date(gameEndtime)

		startDayNumber = startDate.getDay() + 1
		endDayNumber = startDate.getDay() + 1

		startHourNumber = startDate.getHours() + 1
		endHourNumber = endDate.getHours() + 1

		startKey = String(startDayNumber) + String(startHourNumber)
		endKey = String(endDayNumber) + String(endDayNumber)

		template[startKey].value = template[startKey].value + 1
		template[endKey].value = template[endKey].value + 1
	}
	console.log(template)
})

