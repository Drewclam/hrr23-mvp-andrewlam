var https = require('https');
// var utils = require('./utils.js');
var mongoose = require('mongoose');
var Player = require('./db/playerSchema');


var methods = {

  get: function(req, res) { //get all players stored
    Player.find({})
    .exec(function(err, players) {
      if (err) {
        res.send('error retrieving all players', err);
      } else {
        res.send(JSON.stringify(players));
      }
    });
  },

  post: function(req, res) { // create a new player entry
    var newPlayer = new Player();

    newPlayer.userId = req.body.userId;
    newPlayer.username = req.body.username;
    newPlayer.pool = req.body.pool;

    newPlayer.save((err, player) => {
      if (err) {
        res.send('error creating player ', err);
      } else {
        res.send('created player: ', player);
      }
    })
  }

};







module.exports.methods = methods;