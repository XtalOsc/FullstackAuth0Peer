var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var portDecision = process.env.PORT || 3030;

var connection = require('../modules/connection');
mongoose.connect(connection);

var Items = require('../models/newItem');

app.listen(portDecision, function(){
  console.log('Im listening on : ', portDecision);
});

app.get('/', function(req,res){
  console.log('base url has been hit');
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/test', function(req,res){
console.log('test route');

var testy = new Items({
name: 'rubberDucky',
description: 'yellow duck',
owner: 'Dev',
imageURL: String
});//end testy object
testy.save(function(err){
  if (err) {
    console.log(err);
    res.sendStatus(500);
  }else {
    console.log('User saved successfully');
    res.sendStatus(200);
  }
});
});//end app.get test

app.use(express.static('public'));
