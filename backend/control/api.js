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

    app.post('/api/highscores', async function (req, res) {
        let highscore = new Highscores({
            username: req.body.username,
            score: req.body.score
        });
        await highscore.save();
        res.send(highscore);
    });

}