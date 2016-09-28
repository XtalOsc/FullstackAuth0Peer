var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var portDecision = process.env.PORT || 6789;

var connection = require('../modules/connection');
mongoose.connect(connection);

app.listen(portDecision, function(){
  console.log('Im listening on : ', portDecision);
});

app.get('/', function(req,res){
  console.log('base url has been hit');
  res.sendFile(path.resolve('public/index.html'));
});

app.use(express.static('public'));
