var configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return 'mongodb+srv://' +
            configValues.username + ':' + configValues.password +
            '@cluster0.828xi.mongodb.net/space-invaders?retryWrites=true&w=majority';
    }

}