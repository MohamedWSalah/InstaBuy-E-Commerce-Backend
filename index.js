const Express = require('express');
const E = Express();
const mongoose = require('mongoose');
const config = require('config');

E.use(Express.json());
E.use(Express.urlencoded({ extended: true }));



//Database Connect
mongoose.connect('mongodb://localhost/InstaBuy', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to InstaBuy DB.'))
    .catch(err => console.log(err.message));

const port = process.env.PORT || config.get('port');
E.listen(port);
console.log(`Listening on port ${port}`);