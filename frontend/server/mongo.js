var mongoose    = require('mongoose');
require('dotenv').load();


mongoose.connect(process.env.DB_CONNECT);


var Any = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed },{ strict: false });
function dataInit(db){
  return mongoose.model('Data', Any, db);
}


exports.dataInit = dataInit;


