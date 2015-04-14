var db        = require('./mongo.js');
var Data = db.dataInit('ghostneedle');


module.exports = function(app){


  app.get('/', function(req, res) {
    res.render('index');
  });


// ***
// Outputs everything in the database
// ***
  app.get('/ghostneedle', function(req,res){
    Data.find(function(err,doc){
      if(err) res.send(err);
      res.status(200).send(doc);
    });
  });


};

