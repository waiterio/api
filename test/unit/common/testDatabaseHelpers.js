'use strict';

const DBHelpers = require('../../../common/databaseHelpers.js');
const Assert = require('chai').assert;

describe('database helpers', function() {
	it('should contain getOrderByQuery function', function() {
		Assert.isFunction(DBHelpers.getOrderByQuery);
	});

	it('should contain getInsertQueryData function', function() {
		Assert.isFunction(DBHelpers.getInsertQueryData);
	});

	it('should contain getUpdateQueryData function', function() {
		Assert.isFunction(DBHelpers.getUpdateQueryData);
	});

	it('should contain getLimitQuery function', function() {
		Assert.isFunction(DBHelpers.getLimitQuery);
	});

	it('should contain prepareQueryOptions function', function() {
		Assert.isFunction(DBHelpers.prepareQueryOptions);
	});

	describe('getOrderByQuery should', require('./databaseHelpers/testGetOrderByQuery.js'));
	describe('getInsertQueryData should', require('./databaseHelpers/testGetInsertQueryData.js'));
	describe('getUpdateQueryData should', require('./databaseHelpers/testGetUpdateQueryData.js'));
	describe('getLimitQuery should', require('./databaseHelpers/testGetLimitQuery.js'));
	describe('prepareQueryOptions should', require('./databaseHelpers/testPrepareQueryOptions.js'));
});
