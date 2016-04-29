'use strict';

describe('database helpers', function() {
	describe('getOrderByQuery should', require('./databaseHelpers/testGetOrderByQuery.js'));
	describe('getInsertQueryData should', require('./databaseHelpers/testGetInsertQueryData.js'));
	describe('getLimitQuery should', require('./databaseHelpers/testGetLimitQuery.js'));
	describe('prepareQueryOptions should', require('./databaseHelpers/testPrepareQueryOptions.js'));
});
