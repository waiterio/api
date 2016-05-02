'use strict';

const Assert = require('chai').assert;

describe('sqlite class should', function() {
	it('be cached in production', function() {
		const DB = require('../../../common/sqlite.js')({environment: 'production', database: ':memory:'});
		// TODO: validate if the database is cached
		Assert.isObject(DB);
	});

	it('be verbose in development', function() {
		const DB = require('../../../common/sqlite.js')({ environment: 'development', database: ':memory:' });
		// TODO: validate if the database is cached
		Assert.isObject(DB);
	});

	it('throw an error when the database is not defined', function() {
		function callSqlite() {
			return require('../../../common/sqlite.js')({ environment: 'development' });
		}

		Assert.throws(callSqlite, Error, 'no database file given');
	});

	it('throw an error when the environment is not defined', function() {
		function callSqlite() {
			return require('../../../common/sqlite.js')({ database: 'abc' });
		}

		Assert.throws(callSqlite, Error, 'no environment given');
	});
});
