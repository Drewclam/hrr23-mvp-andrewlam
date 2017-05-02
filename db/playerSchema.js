var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
  userId: String,
  username: String,
  wins: String,
  losses: String,
  pool: String
});

module.exports = mongoose.model('Player', PlayerSchema);