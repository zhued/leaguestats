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

		startKey = String(startDayNumber)+String(startHourNumber)
		endKey = String(endDayNumber)+String(endHourNumber)
		
		// check if the game is over an hour long
		check_game = endHourNumber - startHourNumber
		if (check_game > 1 ) {
			template[startKey].value += 0.5;
			for (var i = 1; i < check_game; i++) {
				increment = String(startHourNumber + 1)
				incrementKey = String(startDayNumber)+String(increment)
				template[incrementKey].value += 1;
			};
			template[endKey].value += 0.5;
		} else if (startHourNumber == 23 && endHourNumber == 1) { // checking for 23 to 1
			template[startKey].value += 0.5;
			template['24'].value += 1;
			template[endKey].value += 0.5;
		} else if (startHourNumber == 24 && endHourNumber == 2) { // checking for 24 to 2
			template[startKey].value += 0.5;
			template['1'].value += 1;
			template[endKey].value += 0.5;
		} else if (check_game == 0 | check_game == 1 | check_game == -23){
			template[startKey].value += 1;
			template[endKey].value += 1;
		};
	}
})

