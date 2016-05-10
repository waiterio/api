const Helpers = require('../../../../common/databaseHelpers.js');
const Assert = require('chai').assert;

module.exports = function() {
	it('return nothing when input is nothing', function(done) {
		Assert.equal(Helpers.prepareQueryOptions(null), null);
		done();
	});

	it('return default information when only table is present', function() {
		const queryOptions = { table: 'users' };
		const returnedQueryOptions = Helpers.prepareQueryOptions(queryOptions);

		Assert.equal(returnedQueryOptions.fields, '*');
		Assert.equal(returnedQueryOptions.limit, '');
		Assert.equal(returnedQueryOptions.orderBy, '');
		Assert.equal(returnedQueryOptions.table, 'users');
	});

	it('throw an error when table is not defined', function() {
		Assert.throws(function() { Helpers.prepareQueryOptions({ limit: 'abc' }) }, Error, 'table cannot be undefined');
	});
};
