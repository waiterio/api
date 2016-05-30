'use strict';

let database;
let sqlite;

const fs = require('fs');

const log = require('./logging.js');
const dbRepository = require('./databaseRepository.js');

module.exports = function(options) {
	options.database = (process.env.DATABASE || options.database);

	if (options.environment === 'production') {
		sqlite = require('sqlite3').cached;
	} else if (options.environment === 'development') {
		sqlite = require('sqlite3').verbose();
	} else {
		throw new Error('no environment given');
	}

	if (typeof options.database !== 'undefined') {
		database = new sqlite.Database(options.database);
		log.info('connection to database established', { file: database.filename, mode: database.mode });
	} else {
		throw new Error('no database file given');
	}

	if (options.database === ':memory:') {
		database.exec(fs.readFileSync('./bootstrap_db.sql', 'utf-8'));
	}

	return {
		action: dbRepository.getRepo(database),
		db: database
	};
};
