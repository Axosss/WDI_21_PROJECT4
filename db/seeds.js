var mongoose = require('mongoose');
var User = require('../models/user');
var bluebird = require("bluebird");

var databaseUri = require('../config/db')('development');
mongoose.connect(databaseUri);
mongoose.Promise = bluebird;

User.collection.drop();

User.create([
  {
    username: "axel",
    email: "axelberdugo@gmail.com",
    password: "password",
    passwordConfirmation: "password",
    avatar: "http://www.fillmurray.com/300/300",
    score: 0
  },{
    username: "mickyginger",
    email: "mike.hayden@ga.co",
    password: "password",
    passwordConfirmation: "password",
    avatar: "http://www.fillmurray.com/300/300",
    score: 0
  },{
    username: "roro",
    email: "rosanna.rossington@ga.co",
    password: "password",
    passwordConfirmation: "password",
    avatar: "http://www.fillmurray.com/300/300",
    score: 0
  },{
    username: "chansec",
    email: "chanse.campbell@ga.co",
    password: "password",
    passwordConfirmation: "password",
    avatar: "http://www.fillmurray.com/300/300",
    score: 0
  }
], function(err, users) {
  console.log(users);
  mongoose.connection.close();
})