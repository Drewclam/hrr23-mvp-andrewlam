var https = require('https');
var utils = require('./utils.js');

var requestParams = {
  url: 'https://na.api.riotgames.com/api/lol/NA/v2.5/league/challenger',
  type: 'type=RANKED_SOLO_5x5',
  apiKey: 'api_key=RGAPI-54200fed-7052-4fc0-be83-08ee2eb6a855'
};

var methods = {

  get: function(req, res) {
    var body = '';
    https.get(requestParams.url + '?' + requestParams.type + '&' + requestParams.apiKey, function(result) {
      result.on('data', function(chunk) {
        body += chunk;
      });
      result.on('end', function() {
        var parsed = utils.parseData(body);
        res.end(parsed);
      });
    });
  }

};










module.exports.methods = methods;