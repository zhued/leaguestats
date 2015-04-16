var dotenv   = require('dotenv'), // used for keys -> get from .env
<<<<<<< HEAD
  	db       = require('../server/mongo.js');
  	mongoose = require('mongoose');
=======
  db     = require('../server/mongo.js');
  mongoose = require('mongoose'),
  getTemplate = require('./getTemplate.js');
>>>>>>> 29d8d936038af5b43bdecaaeba7a57995800025b

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
			template[start].value += 1;
			for (var i = 1; i < check_game; i++) {
				console.log(i)
				increment = String(startHourNumber + i)
			};
			template[end].value += 1;
		} else if (check_game == -23) { // checking oen case => 24 to 1

		} else if (check_game == -22) { // checking for 23 to 1 or 24 to 2

		} else if (check_game == 0 | check_game == 1){
			// template[startKey].value += 1;
			// template[endKey].value += 1;
		};
	}
	// console.log(template)
})

