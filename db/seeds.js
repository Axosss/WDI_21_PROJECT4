var mongoose = require('mongoose');
var User = require('../models/user');

var databaseUri = require('../config/db')('development');
mongoose.connect(databaseUri);

User.collection.drop();

User.create([
  {
    username: "axel",
    email: "axelberdugo@gmail.com",
    password: "password",
    passwordConfirmation: "password"
  },{
    username: "mickyginger",
    email: "mike.hayden@ga.co",
    password: "password",
    passwordConfirmation: "password"
  },{
    username: "roro",
    email: "rosanna.rossington@ga.co",
    password: "password",
    passwordConfirmation: "password"
  },{
    username: "chansec",
    email: "chanse.campbell@ga.co",
    password: "password",
    passwordConfirmation: "password"
  }
], function(err, users) {
  console.log(users);
  mongoose.connection.close();
})