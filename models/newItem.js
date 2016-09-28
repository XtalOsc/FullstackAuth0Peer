var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newItem = new Schema ({
  name: String,
  description: String,
  owner: String,
  imageURL: String
});

var Items = mongoose.model('items', newItem);

module.exports = Items;
