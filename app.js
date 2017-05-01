var express = require('express');
var app = express();
var requestHandler = require('./request-handler.js');
var mongoose = require('mongoose');
// make sure mongod is running in shell first!
mongoose.connect('mongodb://localhost/mvpdb');
var mvpConnection = mongoose.connection;
mvpConnection.on('error', console.error.bind(console, 'Error connecting to mongodb'));
mvpConnection.once('open', function() {
  console.log('Successfully connected to mongodb');
});

var port = 8080;



app.use(express.static('public'));

// routes
app.get('/', requestHandler.methods.get);
// app.get('/index', );



app.listen(port);
console.log('app.js listening on port:' + port);