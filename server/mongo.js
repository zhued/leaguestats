var mongoose = require('mongoose');
var mongodb = require('mongodb').MongoClient,
	assert = require('assert');
require('dotenv').load();



mongoose.connect(process.env.DB_CONNECT);



// var findDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     assert.equal(2, docs.length);
//     console.log("Found the following records");
//     console.dir(docs)
//     callback(docs);
//   });      
// }

// mongodb.connect(process.env.DB_CONNECT, function(err, db) {
// 	console.log("Connected correctly to server");
// 	findDocuments(db, function() {
// 		db.close();
// 	});
//   // db.close();
// });



var Any = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed },{ strict: false });
function dataInit(db){
  return mongoose.model('Data', Any, db);
}

function DB_close(db){
	return mongoose.disconnect();
}

function DB_collections(){
	// return mongodb.db.getCollection();
	// return mongoose.Connection.prototype.collection("somepanda");
}

exports.dataInit = dataInit;
exports.DB_close = DB_close;
exports.DB_collections = DB_collections;

