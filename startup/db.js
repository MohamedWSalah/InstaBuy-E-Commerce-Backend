const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    //Database Connect
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost/InstaBuy', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.info("Connected to InstaBuyDB..."))
        .catch(err => winston.error(err.message));

}
