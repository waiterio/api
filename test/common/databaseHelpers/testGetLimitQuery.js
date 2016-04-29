const Helpers = require('../../../common/databaseHelpers.js');
const Assert = require('chai').assert;

module.exports = function() {
	it('return an empty string with no limit set', function() {
		Assert.equal(Helpers.getLimitQuery(), '');
	});

	it('return an empty string with NaN limit', function() {
		Assert.equal(Helpers.getLimitQuery(parseInt('abc')), '');
	});

	it('return a limit with positive number', function() {
		Assert.equal(Helpers.getLimitQuery(10), ' LIMIT 10');
	});

	it('return a limit with zero as a number', function() {
		Assert.equal(Helpers.getLimitQuery(0), ' LIMIT 0');
	});

	it('return a limit with a negative number', function() {
		Assert.equal(Helpers.getLimitQuery(-23), ' LIMIT 0');
	});
};
