'use strict';

const Promises = require('bluebird');
const Postgres = require('pg-promise');
const Settings = require('../settings.js');
const Repository = require('./repository.js');

const options = {
	promiseLib: Promises,
	extend: function(db) {
		this.action = Repository.getRepo(db);
	}
};

const pgp = Postgres(options);

if (typeof process.env.DATABASE_URL !== 'undefined') {
	db = pgp(`${process.env.DATABASE_URL.toString()} ?ssl=true`);
} else {
	db = pgp(Settings.database);
}

module.exports = {
	db, pgp
};
