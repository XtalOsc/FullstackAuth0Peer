var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());

var portDecision = process.env.PORT || 8080;

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

app.get('/viewItem', function(req,res){
  console.log('in get');
  Items.find({}, function (err,results){
    if (err){
      console.log('error:',err);
      res.sendStatus(500);
    }//end if
    else{
      console.log('shelfResults:',results);
      res.send(results);
    }//end else
  });//end find
});//end get

app.post('/addItem', function(req,res){
  var sentData = req.body;
  console.log('req.body',req.body);
  console.log('in post',sentData);
  var newItem = new Items({
    name: sentData.name,
    description: sentData.description,
    owner: sentData.owner,
    imageURL: sentData.imageURL
  });//end test
  newItem.save(function(err){
    if (err){
      console.log('error:',err);
      res.sendStatus(500);
    }//end if
    else{
      console.log('success',newItem);
      res.send(newItem);
    }//end else
  });//end save
});//end post







app.use(express.static('public'));
