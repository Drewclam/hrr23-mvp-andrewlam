var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  pool: String
});

module.exports = mongoose.model('Player', PlayerSchema);