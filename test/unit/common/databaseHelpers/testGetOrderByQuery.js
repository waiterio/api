const Helpers = require('../../../../common/databaseHelpers.js');
const Assert = require('chai').assert;

module.exports = function() {
	it('return default query part with no parameter', function() {
		Assert.equal(Helpers.getOrderByQuery(), ' ORDER BY id ASC');
	});

	it('return correct query part with single ascending parameter', function() {
		const parameter = 'username';
		Assert.equal(Helpers.getOrderByQuery(parameter), ' ORDER BY username ASC');
	});

	it('return correct query part with single descending parameter', function() {
		const parameter = '-email';
		Assert.equal(Helpers.getOrderByQuery(parameter), ' ORDER BY email DESC');
	});

	it('return correct query part with multiple ascending parameters', function() {
		const parameter = 'id,email,user,password';
		Assert.equal(Helpers.getOrderByQuery(parameter), ' ORDER BY id ASC, email ASC, user ASC, password ASC');
	});

	it('return correct query part with multiple descending parameters', function() {
		const parameter = '-order,-user,-login';
		Assert.equal(Helpers.getOrderByQuery(parameter), ' ORDER BY order DESC, user DESC, login DESC');
	});

	it('return correct query part with multiple mixed parameters', function() {
		const parameter = 'user,-price,-size,date';
		Assert.equal(Helpers.getOrderByQuery(parameter), ' ORDER BY user ASC, price DESC, size DESC, date ASC');
	});
};
