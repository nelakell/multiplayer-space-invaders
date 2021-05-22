var Highscores = require('../models/highscoreModel');
var bodyParser = require('body-parser');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/highscores', function (req, res) {
        Highscores.find({},
            function (err, highscores) {
                if (err) throw err;
                res.send(highscores);
            });
    });

}