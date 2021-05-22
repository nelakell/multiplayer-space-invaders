var Highscores = require('../models/highscoreModel');

module.exports = function (app) {

    app.get('/api/setupHighscores', function (req, res) {

        //seed database
        var starterHighscores = [
            {
                username: 'Player 1',
                score: 1000
            },
            {
                username: 'Player 2',
                score: 2000
            },
            {
                username: 'Player 3',
                score: 3000
            }
        ];
        Highscores.create(starterHighscores, function(err, result){
            res.send(result)
        });
    });
}