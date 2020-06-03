const Express = require('express');
const express = Express();
require('express-async-errors');

require('./startup/logging')();
require('./startup/config')(express);
require('./startup/validation')();
require('./startup/routes')(express);
require('./startup/db')();

