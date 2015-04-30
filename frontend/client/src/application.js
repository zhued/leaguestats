var app = angular.module('leaguestats-ui', []);

app.controller('HomeController', ['$http', function($http) {
  var ui = this;

  ui.resData = [];
  ui.timeData = {}
  ui.summonerName = '';
  ui.response = false;

  ui.getSummoner = function() {
    if (ui.summonerName) {
      var querystring = (ui.summonerName).toLowerCase().replace(/ /g, '');
      $http.get('/summoner/'+querystring).success(function(data) {
        ui.resData = data;
        ui.timeData = timeParse(data);
        ui.summoner = data[0].summoner_id;
        drawCal();
        ui.response = true;
      });
    }
  };

  ui.dateFilter = function() {
    var start = new Date(ui.fromDate).getTime();
    var end = new Date(ui.toDate).getTime();
    if(end - start < 0) {
      alert('End date must come after start date.  Please try again.');
      return;
    } else {
      var newGames = [];
      ui.resData.forEach(function(game) {
        if(game.gameEndtime >= start && game.gameEndtime <= end) {
          newGames.push(game);
        }
      });
      ui.resData = newGames;
      ui.timeData = timeParse(newGames);
      delete newGames;
      drawCal();
    }
  }

  var timeParse = function(data) {
    var template = {
  	  '11': { day: 1, hour: 1, value: 0 },
  	  '12': { day: 1, hour: 2, value: 0 },
  	  '13': { day: 1, hour: 3, value: 0 },
  	  '14': { day: 1, hour: 4, value: 0 },
  	  '15': { day: 1, hour: 5, value: 0 },
  	  '16': { day: 1, hour: 6, value: 0 },
  	  '17': { day: 1, hour: 7, value: 0 },
  	  '18': { day: 1, hour: 8, value: 0 },
  	  '19': { day: 1, hour: 9, value: 0 },
  	  '110': { day: 1, hour: 10, value: 0 },
  	  '111': { day: 1, hour: 11, value: 0 },
  	  '112': { day: 1, hour: 12, value: 0 },
  	  '113': { day: 1, hour: 13, value: 0 },
  	  '114': { day: 1, hour: 14, value: 0 },
  	  '115': { day: 1, hour: 15, value: 0 },
  	  '116': { day: 1, hour: 16, value: 0 },
  	  '117': { day: 1, hour: 17, value: 0 },
  	  '118': { day: 1, hour: 18, value: 0 },
  	  '119': { day: 1, hour: 19, value: 0 },
  	  '120': { day: 1, hour: 20, value: 0 },
  	  '121': { day: 1, hour: 21, value: 0 },
  	  '122': { day: 1, hour: 22, value: 0 },
  	  '123': { day: 1, hour: 23, value: 0 },
  	  '124': { day: 1, hour: 24, value: 0 },
  	  '21': { day: 2, hour: 1, value: 0 },
  	  '22': { day: 2, hour: 2, value: 0 },
  	  '23': { day: 2, hour: 3, value: 0 },
  	  '24': { day: 2, hour: 4, value: 0 },
  	  '25': { day: 2, hour: 5, value: 0 },
  	  '26': { day: 2, hour: 6, value: 0 },
  	  '27': { day: 2, hour: 7, value: 0 },
  	  '28': { day: 2, hour: 8, value: 0 },
  	  '29': { day: 2, hour: 9, value: 0 },
  	  '210': { day: 2, hour: 10, value: 0 },
  	  '211': { day: 2, hour: 11, value: 0 },
  	  '212': { day: 2, hour: 12, value: 0 },
  	  '213': { day: 2, hour: 13, value: 0 },
  	  '214': { day: 2, hour: 14, value: 0 },
  	  '215': { day: 2, hour: 15, value: 0 },
  	  '216': { day: 2, hour: 16, value: 0 },
  	  '217': { day: 2, hour: 17, value: 0 },
  	  '218': { day: 2, hour: 18, value: 0 },
  	  '219': { day: 2, hour: 19, value: 0 },
  	  '220': { day: 2, hour: 20, value: 0 },
  	  '221': { day: 2, hour: 21, value: 0 },
  	  '222': { day: 2, hour: 22, value: 0 },
  	  '223': { day: 2, hour: 23, value: 0 },
  	  '224': { day: 2, hour: 24, value: 0 },
  	  '31': { day: 3, hour: 1, value: 0 },
  	  '32': { day: 3, hour: 2, value: 0 },
  	  '33': { day: 3, hour: 3, value: 0 },
  	  '34': { day: 3, hour: 4, value: 0 },
  	  '35': { day: 3, hour: 5, value: 0 },
  	  '36': { day: 3, hour: 6, value: 0 },
  	  '37': { day: 3, hour: 7, value: 0 },
  	  '38': { day: 3, hour: 8, value: 0 },
  	  '39': { day: 3, hour: 9, value: 0 },
  	  '310': { day: 3, hour: 10, value: 0 },
  	  '311': { day: 3, hour: 11, value: 0 },
  	  '312': { day: 3, hour: 12, value: 0 },
  	  '313': { day: 3, hour: 13, value: 0 },
  	  '314': { day: 3, hour: 14, value: 0 },
  	  '315': { day: 3, hour: 15, value: 0 },
  	  '316': { day: 3, hour: 16, value: 0 },
  	  '317': { day: 3, hour: 17, value: 0 },
  	  '318': { day: 3, hour: 18, value: 0 },
  	  '319': { day: 3, hour: 19, value: 0 },
  	  '320': { day: 3, hour: 20, value: 0 },
  	  '321': { day: 3, hour: 21, value: 0 },
  	  '322': { day: 3, hour: 22, value: 0 },
  	  '323': { day: 3, hour: 23, value: 0 },
  	  '324': { day: 3, hour: 24, value: 0 },
  	  '41': { day: 4, hour: 1, value: 0 },
  	  '42': { day: 4, hour: 2, value: 0 },
  	  '43': { day: 4, hour: 3, value: 0 },
  	  '44': { day: 4, hour: 4, value: 0 },
  	  '45': { day: 4, hour: 5, value: 0 },
  	  '46': { day: 4, hour: 6, value: 0 },
  	  '47': { day: 4, hour: 7, value: 0 },
  	  '48': { day: 4, hour: 8, value: 0 },
  	  '49': { day: 4, hour: 9, value: 0 },
  	  '410': { day: 4, hour: 10, value: 0 },
  	  '411': { day: 4, hour: 11, value: 0 },
  	  '412': { day: 4, hour: 12, value: 0 },
  	  '413': { day: 4, hour: 13, value: 0 },
  	  '414': { day: 4, hour: 14, value: 0 },
  	  '415': { day: 4, hour: 15, value: 0 },
  	  '416': { day: 4, hour: 16, value: 0 },
  	  '417': { day: 4, hour: 17, value: 0 },
  	  '418': { day: 4, hour: 18, value: 0 },
  	  '419': { day: 4, hour: 19, value: 0 },
  	  '420': { day: 4, hour: 20, value: 0 },
  	  '421': { day: 4, hour: 21, value: 0 },
  	  '422': { day: 4, hour: 22, value: 0 },
  	  '423': { day: 4, hour: 23, value: 0 },
  	  '424': { day: 4, hour: 24, value: 0 },
  	  '51': { day: 5, hour: 1, value: 0 },
  	  '52': { day: 5, hour: 2, value: 0 },
  	  '53': { day: 5, hour: 3, value: 0 },
  	  '54': { day: 5, hour: 4, value: 0 },
  	  '55': { day: 5, hour: 5, value: 0 },
  	  '56': { day: 5, hour: 6, value: 0 },
  	  '57': { day: 5, hour: 7, value: 0 },
  	  '58': { day: 5, hour: 8, value: 0 },
  	  '59': { day: 5, hour: 9, value: 0 },
  	  '510': { day: 5, hour: 10, value: 0 },
  	  '511': { day: 5, hour: 11, value: 0 },
  	  '512': { day: 5, hour: 12, value: 0 },
  	  '513': { day: 5, hour: 13, value: 0 },
  	  '514': { day: 5, hour: 14, value: 0 },
  	  '515': { day: 5, hour: 15, value: 0 },
  	  '516': { day: 5, hour: 16, value: 0 },
  	  '517': { day: 5, hour: 17, value: 0 },
  	  '518': { day: 5, hour: 18, value: 0 },
  	  '519': { day: 5, hour: 19, value: 0 },
  	  '520': { day: 5, hour: 20, value: 0 },
  	  '521': { day: 5, hour: 21, value: 0 },
  	  '522': { day: 5, hour: 22, value: 0 },
  	  '523': { day: 5, hour: 23, value: 0 },
  	  '524': { day: 5, hour: 24, value: 0 },
  	  '61': { day: 6, hour: 1, value: 0 },
  	  '62': { day: 6, hour: 2, value: 0 },
  	  '63': { day: 6, hour: 3, value: 0 },
  	  '64': { day: 6, hour: 4, value: 0 },
  	  '65': { day: 6, hour: 5, value: 0 },
  	  '66': { day: 6, hour: 6, value: 0 },
  	  '67': { day: 6, hour: 7, value: 0 },
  	  '68': { day: 6, hour: 8, value: 0 },
  	  '69': { day: 6, hour: 9, value: 0 },
  	  '610': { day: 6, hour: 10, value: 0 },
  	  '611': { day: 6, hour: 11, value: 0 },
  	  '612': { day: 6, hour: 12, value: 0 },
  	  '613': { day: 6, hour: 13, value: 0 },
  	  '614': { day: 6, hour: 14, value: 0 },
  	  '615': { day: 6, hour: 15, value: 0 },
  	  '616': { day: 6, hour: 16, value: 0 },
  	  '617': { day: 6, hour: 17, value: 0 },
  	  '618': { day: 6, hour: 18, value: 0 },
  	  '619': { day: 6, hour: 19, value: 0 },
  	  '620': { day: 6, hour: 20, value: 0 },
  	  '621': { day: 6, hour: 21, value: 0 },
  	  '622': { day: 6, hour: 22, value: 0 },
  	  '623': { day: 6, hour: 23, value: 0 },
  	  '624': { day: 6, hour: 24, value: 0 },
  	  '71': { day: 7, hour: 1, value: 0 },
  	  '72': { day: 7, hour: 2, value: 0 },
  	  '73': { day: 7, hour: 3, value: 0 },
  	  '74': { day: 7, hour: 4, value: 0 },
  	  '75': { day: 7, hour: 5, value: 0 },
  	  '76': { day: 7, hour: 6, value: 0 },
  	  '77': { day: 7, hour: 7, value: 0 },
  	  '78': { day: 7, hour: 8, value: 0 },
  	  '79': { day: 7, hour: 9, value: 0 },
  	  '710': { day: 7, hour: 10, value: 0 },
  	  '711': { day: 7, hour: 11, value: 0 },
  	  '712': { day: 7, hour: 12, value: 0 },
  	  '713': { day: 7, hour: 13, value: 0 },
  	  '714': { day: 7, hour: 14, value: 0 },
  	  '715': { day: 7, hour: 15, value: 0 },
  	  '716': { day: 7, hour: 16, value: 0 },
  	  '717': { day: 7, hour: 17, value: 0 },
  	  '718': { day: 7, hour: 18, value: 0 },
  	  '719': { day: 7, hour: 19, value: 0 },
  	  '720': { day: 7, hour: 20, value: 0 },
  	  '721': { day: 7, hour: 21, value: 0 },
  	  '722': { day: 7, hour: 22, value: 0 },
  	  '723': { day: 7, hour: 23, value: 0 },
  	  '724': { day: 7, hour: 24, value: 0 }
  	};

  	var games = data;

  	games.forEach(function(game) {

  		timePlayed = game.timePlayed;
  		gameEndtime = game.gameEndtime;
  		summonerId = game.summoner_id;
  		gameStartTime = gameEndtime - (timePlayed * 1000);

  		startDate = new Date(gameStartTime);
  		endDate = new Date(gameEndtime);

  		startDayNumber = startDate.getDay() + 1;
  		endDayNumber = startDate.getDay() + 1;

  		startHourNumber = startDate.getHours() + 1;
  		endHourNumber = endDate.getHours() + 1;

  		startKey = String(startDayNumber)+String(startHourNumber);
  		endKey = String(endDayNumber)+String(endHourNumber);

  		// check if the game is over an hour long
  		check_game = endHourNumber - startHourNumber;
  		if (check_game > 1 ) {
  			template[startKey].value += 0.5;
  			for (var i = 1; i < check_game; i++) {
  				increment = String(startHourNumber + 1);
  				incrementKey = String(startDayNumber)+String(increment);
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
  		} else if (check_game == 0 | check_game == 1 | check_game == -23) {
  			template[startKey].value += 1;
  			template[endKey].value += 1;
  		};
  	});

    var timeList = []
    for(var timeCode in template) {
      timeList.push(template[timeCode]);
    }
    delete template;
    return timeList;
  }

  var drawCal = function() {

    d3.select("#chart").select("svg").remove();

    var margin = { top: 50, right: 0, bottom: 100, left: 30 },
      width = 960 - margin.left - margin.right,
      height = 430 - margin.top - margin.bottom,
      gridSize = Math.floor(width / 24),
      legendElementWidth = gridSize*2,
      buckets = 9,
      colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
      days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12a"];

    var data = ui.timeData;

    var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
        .range(colors);

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dayLabels = svg.selectAll(".dayLabel")
        .data(days)
        .enter().append("text")
          .text(function (d) { return d; })
          .attr("x", 0)
          .attr("y", function (d, i) { return i * gridSize; })
          .style("text-anchor", "end")
          .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
          .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

    var timeLabels = svg.selectAll(".timeLabel")
        .data(times)
        .enter().append("text")
          .text(function(d) { return d; })
          .attr("x", function(d, i) { return i * gridSize; })
          .attr("y", 0)
          .style("text-anchor", "middle")
          .attr("transform", "translate(" + gridSize / 2 + ", -6)")
          .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

    var heatMap = svg.selectAll(".hour")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d) { return (d.hour - 1) * gridSize; })
        .attr("y", function(d) { return (d.day - 1) * gridSize; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", colors[0]);

    heatMap.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.value); });

    heatMap.append("title").text(function(d) { return d.value; });

    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function(d) { return d; })
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
      .attr("x", function(d, i) { return legendElementWidth * i; })
      .attr("y", height)
      .attr("width", legendElementWidth)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return "≥ " + Math.round(d); })
      .attr("x", function(d, i) { return legendElementWidth * i; })
      .attr("y", height + gridSize);

  }

}]);
