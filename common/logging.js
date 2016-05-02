'use strict';

const Winston = require('winston');

let logger = new (Winston.Logger)({
	levels: {
		info: 0,
		warn: 0,
		error: 0
	},
	colors: {
		info: 'blue',
		warn: 'yellow',
		error: 'red'
	},
	transports: [
		new (Winston.transports.Console)({ name: 'console-log', colorize: true }),
		new (Winston.transports.File)({ name: 'file-log', filename: './logs/general.log' })
	]
});

logger.add(Winston.transports.File, {
	name: 'exceptions-log',
	filename: './logs/error.log',
	handleExceptions: true,
	humanReadableUnhandledException: true,
	level: 'error'
});

if(process.env.NODE_ENV === 'test') {
	logger.remove('console-log');
	logger.remove('file-log');
	logger.remove('exceptions-log');
}

module.exports = logger;
