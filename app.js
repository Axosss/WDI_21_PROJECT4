var express = require("express");
var app = express();
var morgan = require("morgan");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var environment = app.get('env');
var routes = require('./config/routes');
var databaseUri = require('./config/db')(environment);


mongoose.connect(databaseUri);

var port = process.env.PORT || 3000;

if('test' !== environment) {
  app.use(require('morgan')('dev'));
}

app.use(express.static('public'));

// app.use('/', routes);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, function(){
  console.log("Express is alive and kicking on port " + port);
});
