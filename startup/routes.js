const Express = require('express');
const items = require('../routes/items');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const category = require('../routes/category');

module.exports = function (express) {
    express.use(Express.json());
    express.use(Express.urlencoded({ extended: true }));
    express.use('/auth', auth);
    express.use('/item', items);
    express.use('/user', users);
    express.use('/category', category)
    express.use(error);
}