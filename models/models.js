var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
  username:String,
  email:String,
  password:String
  });

var User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
module.exports = User;