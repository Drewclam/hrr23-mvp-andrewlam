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
      // parse tier data
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
      //
      console.log('parsed data from getTierData', parsed);
      callback(parsed);
    }, function error(response) {
      console.log('error retrieving data');
    });
  }

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

      callback(parsed);
    }, function error(response) {
      console.log('error retrieving user data');
    });
  }
})