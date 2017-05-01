var parseData = function(body) {
  var parsedData = {};
  JSON.parse(body).entries.forEach(function(entry) {
    var player = {};
    player.leaguePoints = entry.leaguePoints;
    player.wins = entry.wins;
    player.losses = entry.losses;
    parsedData[entry.playerOrTeamName] = player;
  });
  parsedData = JSON.stringify(parsedData);
  return parsedData;
};

module.exports.parseData = parseData;