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
        }
        res.send(JSON.stringify(players));
    });
  },

  post: function(req, res) { // create a new player entry

  }

};







module.exports.methods = methods;