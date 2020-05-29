const winston = require('winston');
require('winston-mongodb');


module.exports = function () {
    winston.configure(
        {
            transports: [new winston.transports.File(
                { filename: 'logfile.log' }
            )]
        }
    );

    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File(
        { filename: 'uncaughtException.log' }
    ));

    process.on('uncaughtException', (ex) => {
        console.log('! ~Uncaught Exception~ !');
        winston.error(ex.message, ex);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        console.log('! ~Unhandled Rejection~ !');
        winston.error(ex.message, ex);
        process.exit(1);
    });


}