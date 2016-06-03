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
			trace: 0,
			debug: 1,
			route: 2,
			data: 3,
			help: 4,
			info: 5,
			warn: 6,
			error: 7
		},
		colors: {
			trace: 'grey',
			debug: 'cyan',
			route: 'blue',
			data: 'grey',
			help: 'magenta',
			info: 'green',
			warn: 'yellow',
			error: 'red'
		},
		transports: [
			new (winston.transports.Console)({ name: 'console-log', colorize: true, silent: false, level: 'error'}),
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
