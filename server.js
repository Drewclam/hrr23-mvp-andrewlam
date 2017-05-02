var express = require('express');
var app = express();
var requestHandler = require('./request-handler.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// make sure mongod is running in shell first!
mongoose.connect('mongodb://localhost/mvpdb');
var mvpConnection = mongoose.connection;
mvpConnection.on('error', console.error.bind(console, 'Error connecting to mongodb'));
mvpConnection.once('open', function() {
  console.log('Successfully connected to mongodb');
});

var port = 8080;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('./'))
app.use(express.static('./client'));

// routes
app.get('/players', requestHandler.methods.get);
app.get('/players/:username', requestHandler.methods.getByUsername);
app.post('/players', requestHandler.methods.post);
app.delete('/players/:username', requestHandler.methods.delete);


app.listen(port);
console.log('server.js listening on port:' + port);