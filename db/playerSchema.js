var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
  userId: String,
  username: String,
  wins: Number,
  losses: Number,
  // pool: String
});

module.exports = mongoose.model('Player', PlayerSchema);