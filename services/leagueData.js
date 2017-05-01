angular.module('mvp')

.service('leagueData', function($http) {

  var requestParams = {
    url: 'https://na.api.riotgames.com/api/lol/NA/v2.5/league/challenger',
    type: 'type=RANKED_SOLO_5x5',
    apiKey: 'api_key=RGAPI-54200fed-7052-4fc0-be83-08ee2eb6a855'
  };

  this.getTierData = function(callback) {
    $http.get(requestParams.url + '?' + requestParams.type + '&' + requestParams.apiKey)
    .then(function success(response) {
      console.log('success retrieving data');
      // parse tier data
      var parsed = {};
      response.data.entries.forEach(function(entry) {
        var player = {};
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
})