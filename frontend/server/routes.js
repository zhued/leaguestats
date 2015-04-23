var db     = require('./mongo.js'),
timeParser = require('./timeParse.js');
games      = db.dataInit('games'),
summoners  = db.dataInit('summoners');


module.exports = function(app){

  app.get('/', function(req, res) {
    res.render('index');
  });


// ***
// Gets times for a certain summoner
// ***
  app.get('/summoner/:summoner_name', function(req,res){
  	summoners.find({ summoner_short:req.params.summoner_name }, function(err,doc){
  		if(err) res.send(err);
      doc = JSON.stringify(doc);
      doc = JSON.parse(doc);
      games.find({ summoner_id:doc[0].summoner_id }, function(err,games){
        if(err) res.send(err);
        res.send(games);
      });
  	});
  });

  app.get('/timedata/:summoner_name', function(req, res) {
    summoners.find({ summoner_short:req.params.summoner_name }, function(err,doc){
  		if(err) res.send(err);
      doc = JSON.stringify(doc);
      doc = JSON.parse(doc);
      games.find({ summoner_id:doc[0].summoner_id }, function(err,games){
        if(err) { res.send(err); } else {
          console.log(games);
          var times = timeParser.parse(JSON.stringify(games));
          var tsv = 'day\thour\tvalue\n';
          for(var timeCode in times) {
            tsv += times[timeCode].day+'\t'+times[timeCode].hour+'\t'+times[timeCode].value+'\n';
          }
          res.format({'text/plain': function() { res.send(tsv); }});
        }
      });
  	});
  });

};
