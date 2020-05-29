const winston = require('winston');
require('winston-mongodb');

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[\x1b[31m${timestamp}\x1b[0m] ${label}=> ${level.toUpperCase()}: ${message}`;
});

module.exports = function () {
    winston.configure(
        {
            transports: [new winston.transports.File(
                { filename: 'logfile.log' }
            )]
        }
    );

    const logger = winston.createLogger({
        level: 'error',
        format: combine(
            label({ label: '' }),
            timestamp(),
            myFormat
        ),
        transports: [
            new winston.transports.File(
                {
                    filename: 'uncaughtException.log'
                }
            ),
            new winston.transports.Console(
                {
                    colorize: true,
                    prettyPrint: true
                })

        ]
    });

    process.on('uncaughtException', (ex) => {
        console.log('! ~Uncaught Exception~ !');
        logger.error(ex.message);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        console.log('! ~Unhandled Rejection~ !');
        logger.error(ex.message);
        process.exit(1);
    });


}