var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./control/setup');
var apiController = require('./control/api');

var port = 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:63342");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString(), {useNewUrlParser: true, useUnifiedTopology: true})
setupController(app);
apiController(app);
console.log("Server running.")

app.listen(port);