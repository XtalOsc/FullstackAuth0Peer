var express = requrie('express');
var app = express();
var mongoose = requrie('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var portDecision = process.env.PORT || 6789;

var connection = require('../modules/connection');
mongoose.connect(connection);
