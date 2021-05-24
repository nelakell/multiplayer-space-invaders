const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const highscoreSchema = new Schema({
    username: String,
    score: Number
});

const Highscores = mongoose.model('Highscores', highscoreSchema);

module.exports = Highscores;