var mongoose = require('mongoose');

const { password } = require('./config')

//connect to MongoDB
mongoose.connect('mongodb+srv://liu93ri:'+password+'@myweatherapp-nwyqq.mongodb.net/test?retryWrites=true&w=majority');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('Database Connected');
});

module.exports = db;