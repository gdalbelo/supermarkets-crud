var mongoose 		= require('../node_modules/mongoose');
var config     		= require('../config');

// conectar com bd de informações gerenciais
mongoose.connect( config.mongo, { useNewUrlParser: true } );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection db error:'));
db.once('open', function() {
  console.log('connection ok mongoosedb...');
});

module.exports = exports = mongoose;