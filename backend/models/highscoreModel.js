var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var highscoreSchema = new Schema({
    username: String,
    score: Number
});

var Highscores = mongoose.model('Highscores', highscoreSchema);

module.exports = Highscores;