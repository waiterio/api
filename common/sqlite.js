'use strict';

let DB;
let SQLite;

const FileSystem = require('fs');

const Log = require('./logging.js');
const Repo = require('./databaseRepository.js');
const Settings = require('../settings.js');
const MemoryDB = require('./memoryDatabase.js');

if (Settings.environment === 'production') {
	SQLite = require('sqlite3').cached;
} else if (Settings.environment === 'development') {
	SQLite = require('sqlite3').verbose();
} else {
	throw new Error('no environment specified in settings');
}

if (typeof Settings.database !== 'undefined') {
	DB = new SQLite.Database(Settings.database);
	Log.info('connection to database established', { file: DB.filename, mode: DB.mode });
} else {
	throw new Error('no database file defined')
}

if (Settings.database == ':memory:') {
	Log.warn('database will reside in memory only and will be deleted once the app stops');
	MemoryDB.loadDataInMemory(FileSystem.readFileSync('./memorydb.sql', 'utf-8'), DB);
}


module.exports = {
	action: Repo.getRepo(DB),
	db: DB
};
