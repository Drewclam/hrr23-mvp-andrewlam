var express = require('express');
var app = express();
var requestHandler = require('./request-handler.js');

var port = 8080;

// routes
// console.log(requestHandler);
app.get('/', requestHandler.methods.get);



app.listen(port);
console.log('app.js listening on port:' + port);