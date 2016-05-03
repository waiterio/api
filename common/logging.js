'use strict';

const Winston = require('winston');
const Settings = require('../settings.js');

const Logger = new (Winston.Logger)({
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

if (Settings.environment === 'production') {
	Logger.add(Winston.transports.File, {
		exitOnError: true,
		name: 'exceptions-log',
		filename: './logs/error.log',
		handleExceptions: false,
		humanReadableUnhandledException: false,
		level: 'error'
	});
}

if (process.env.NODE_ENV === 'test') {
	Logger.remove('console-log');
	Logger.remove('file-log');
	if (Settings.environment === 'production') {
		Logger.remove('exceptions-log');
	}
}

module.exports = Logger;
