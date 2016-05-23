'use strict';

let DB;
let SQLite;

const FileSystem = require('fs');

const Log = require('./logging.js');
const Repo = require('./databaseRepository.js');

module.exports = function(options) {
	options.database = (process.env.DATABASE || options.database);

	if (options.environment === 'production') {
		SQLite = require('sqlite3').cached;
	} else if (options.environment === 'development') {
		SQLite = require('sqlite3').verbose();
	} else {
		throw new Error('no environment given');
	}

	if (typeof options.database !== 'undefined') {
		DB = new SQLite.Database(options.database);
		Log.info('connection to database established', { file: DB.filename, mode: DB.mode });
	} else {
		throw new Error('no database file given');
	}

	if (options.database === ':memory:') {
		DB.exec(FileSystem.readFileSync('./bootstrap_db.sql', 'utf-8'));
	}

	return {
		action: Repo.getRepo(DB),
		db: DB
	};
};
