const Express = require('express');
const express = Express();

require('./startup/logging')();
require('./startup/config')(express);
require('./startup/validation')();
require('./startup/routes')(express);
require('./startup/db')();

throw new Error("hello");