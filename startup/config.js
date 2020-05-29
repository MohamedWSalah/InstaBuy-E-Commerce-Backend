const config = require('config');

module.exports = function (express) {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivate Key not defined');
    };

    const port = process.env.PORT || config.get('port');
    express.listen(port);
    console.log(`Listening on port ${port}`);
}