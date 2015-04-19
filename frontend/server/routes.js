var db     = require('./mongo.js'),
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
      games.find({ summoner_id:doc[0].summoner_id }, function(err,doc){
        if(err) res.send(err);
        res.status(200).send(doc)
      })
  	})
  });
};
