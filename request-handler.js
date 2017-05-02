var https = require('https');
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
    var username = req.body.username;
    console.log('post handler: ', req.body.topPlayed);
    Player.findOne({
      username: username
    })
    .exec((err, player) => {
      if (err) {
        res.send('error finding player while creating');
      }
      if (!player) {
        var newPlayer = new Player();

        newPlayer.userId = req.body.userId;
        newPlayer.username = req.body.username;
        newPlayer.wins = req.body.wins;
        newPlayer.losses = req.body.losses;
        newPlayer.topPlayed = req.body.topPlayed;
        // newPlayer.pool = req.body.pool;

        newPlayer.save((err, player) => {
          if (err) {
            res.send('error creating player ');
          } else {
            res.send('created player: ');
          }
        });
      }
    });
  },

  delete: (req, res) => {
    var username = req.params.username;
    Player.findOne({
      username: username
    })
    .remove()
    .exec((err, player) => {
      if (err) {
        res.send('error deleting player');
      } else {
        res.send(player);
      }
    });
  },

  getByUsername: (req, res) => {
    var username = req.params.username;
    // res.send('finding username ' + username);
    Player.findOne({
      username: username
    })
    .exec((err, player) => {
      if (err) {
        res.send('error finding player');
      } else {
        res.send(player);
      }
    });
  }

};







module.exports.methods = methods;