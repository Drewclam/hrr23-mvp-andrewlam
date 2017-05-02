angular.module('mvp')

.service('leagueData', function($http) {

  var requestParams = {
    url: 'https://na.api.riotgames.com/api/lol/NA/v2.5/league/challenger',
    type: 'type=RANKED_SOLO_5x5',
    apiKey: 'api_key=RGAPI-54200fed-7052-4fc0-be83-08ee2eb6a855'
  };

  this.getTierData = function(callback) {
    $http.get(`https://na.api.riotgames.com/api/lol/NA/v2.5/league/challenger?${requestParams.type}&${requestParams.apiKey}`)
    .then(function success(response) {
      console.log('success retrieving data');
      var parsed = {};
      response.data.entries.forEach(function(entry) {
        var player = {};
        player.id = entry.playerOrTeamId;
        player.name = entry.playerOrTeamName;
        player.leaguePoints = entry.leaguePoints;
        player.wins = entry.wins;
        player.losses = entry.losses;
        parsed[entry.playerOrTeamName] = player;
      });
      callback(parsed);
    }, function error(response) {
      console.log('error retrieving data');
    });
  };

  this.getChampData = function(callback) {
    var id = this.entry.id;
    var name = this.entry.name;
    var wins = this.entry.wins;
    var losses = this.entry.losses;

    $http.get(`https://na.api.riotgames.com/api/lol/NA/v1.3/stats/by-summoner/${id}/ranked?season=SEASON2017&${requestParams.apiKey}`)
    .then(function success(response) {
      console.log('success retrieving user data', response);
      var parsed = {};
      parsed.userId = id;
      parsed.username = name;
      parsed.wins = wins;
      parsed.losses = losses;
      parsed.pool = {};
      response.data.champions.forEach(function(champ) {
        // if champion does not exist create it
        if (!parsed.pool[champ.id]) {
          var champion = {};
          champion.id = champ.id;
          champion.win = champ.stats.totalSessionsWon;
          champion.loss = champ.stats.totalSessionsLost;
          champion.played = champ.stats.totalSessionsPlayed;
          parsed.pool[champ.id] = champion;
        } else {
          // aggregate stats
          parsed.pool[champ.id].win += champ.stats.totalSessionsWon;
          parsed.pool[champ.id].loss += champ.stats.totalSessionsLost;
          parsed.pool[champ.id].played += champ.stats.totalSessionsPlayed;
        }
      });
      var topPlayed = '';
      var games = 0;
      for (var champId in parsed.pool) {
        if (parsed.pool[champId].played > games) {
          topPlayed = champId;
        }
      }
      parsed.topPlayed = topPlayed;
      return parsed;
    })
    // .then((result) => {

      // return result;
    // })
    .then((result) => {
      $http.get(`https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/champion/${result.topPlayed}?${requestParams.apiKey}`)
      .then((response) => {
        console.log('translated id to name', response);
        result.topPlayed = response.data.name + ' ' + response.data.title;
        return result;
      }).then((result) => {
        console.log('sending.... ', result);
        $http.post(`http://localhost:8080/players`, JSON.stringify(result)).then((response) => {
          console.log('successfully saved player');
        }, (response) => {
          console.log('error saving player', response);
        });
      })
    })
    .catch((err) => {
      console.log('error!!!!');
    })
  };

  this.getSavedPlayers = (callback) => {
    $http.get(`http://localhost:8080/players`)
    .then((res) => {
      var parsed = [];
      res.data.forEach((player) => {
        var savedPlayer = {};
        savedPlayer.username = player.username;
        savedPlayer.wins = player.wins;
        savedPlayer.losses = player.losses;
        parsed.push(savedPlayer);
      });
      return parsed;
    })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log('error retrieving saved players');
    });
  };

  this.deletePlayer = (username, callback) => {
    $http.delete(`http://localhost:8080/players/${username}`)
    .then((res) => {
      console.log('deleted player successfully', res);
    })
    .catch((err) => {
      console.log('error deleting player')
    })
  }
})






