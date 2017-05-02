var mongoose = require('mongoose');

var champSchema = new mongoose.Schema({
  champId: Number,
  champName: String,
  wins: Number,
  losses: Number,
  games: Number
});

module.exports = mongoose.model('Champion', champSchema);