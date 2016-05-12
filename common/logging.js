'use strict';

const winston = require('winston');
const settings = require('../settings.js');

const Logger = new (winston.Logger)({
	levels: {
		data: 1,
		info: 2,
		warn: 3,
		error: 4
	},
	colors: {
		data: 'green',
		info: 'blue',
		warn: 'yellow',
		error: 'red'
	},
	transports: [
		new (winston.transports.Console)({ name: 'console-log', colorize: true }),
		new (winston.transports.File)({ name: 'file-log', filename: './logs/general.log' })
	]
});

if (settings.environment === 'production') {
	Logger.add(winston.transports.File, {
		exitOnError: true,
		name: 'exceptions-log',
		filename: './logs/error.log',
		handleExceptions: false,
		humanReadableUnhandledException: false,
		level: 'error'
	});
}


module.exports = Logger;
