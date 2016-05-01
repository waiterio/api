'use strict';

const Winston = require('winston');
const Settings = require('../settings.js');

var logger = new (Winston.Logger)({
	exitOnError: false,
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
		new (Winston.transports.Console)({ colorize: true }),
		new (Winston.transports.File)({ filename: './logs/general.log' })
	]
});

if (Settings.environment === 'production') {
	logger.configure({
		exitOnError: false,
		handleExceptions: false,
		humanReadableUnhandledException: true,
		transports: [
			new Winston.transports.File({ filename: './logs/general.log' })
		]
	});
}

logger.add(Winston.transports.File, {
	name: 'exceptions-log',
	filename: './logs/error.log',
	handleExceptions: true,
	humanReadableUnhandledException: true,
	level: 'error'
});

module.exports = logger;
