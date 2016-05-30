'use strict';

const fileSystem = require('fs');
const winston = require('winston');
const settings = require('../settings.js');

/**
 * @returns {*}
 */
function getLogger() {
	const loggerObject = new (winston.Logger)({
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
		loggerObject.add(winston.transports.File, {
			exitOnError: true,
			name: 'exceptions-log',
			filename: './logs/error.log',
			handleExceptions: false,
			humanReadableUnhandledException: false,
			level: 'error'
		});
	}

	if(process.env.NODE_ENV === 'test') {
		loggerObject.remove('console-log');
		loggerObject.remove('file-log');
	}

	try {
		fileSystem.accessSync('./logs/', fileSystem.W_OK);
	} catch (e) {
		fileSystem.mkdirSync('./logs/');
	}

	return loggerObject;
}

module.exports = getLogger();
