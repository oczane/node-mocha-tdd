var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var config = require('./config');
var User = require('./UserModel');

var app = express();

mongoose.connect(config.db.mongodb);

var parseForm = bodyParser.urlencoded({ extended: true })

app.use(bodyParser.json());
app.use(parseForm);

app.get("/users", function(req, res) {
	User.find({}, function(err, users) {
    	res.send(users);  
  	});
});


app.get("/user/:email", function(req, res) {
	User.findOne({'email': req.params.email}, function(err, doc) {
    	res.send(doc);  
  	});
});

app.post('/user', function(req, res) { 
  var user = new User();
  user.firstname  = req.body.firstname;
  user.lastname   = req.body.lastname;
  user.email      = req.body.email;
  user.password   = req.body.password;
  user.active     = true;
  user.address    = req.body.address;

  user.save(function(err) {
    if (err) {
    	throw err;
    }

    res.send(user);
  });

});

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});

module.exports = app;
