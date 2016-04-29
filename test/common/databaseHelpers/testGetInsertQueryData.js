const Helpers = require('../../../common/databaseHelpers.js');
const Assert = require('chai').assert;

module.exports = function() {
	it('return empty objects without data', function() {
		const queryData = Helpers.getInsertQueryData();

		Assert.equal(queryData.fieldQuery, '()');
		Assert.equal(queryData.valueQuery, '()');
		Assert.deepEqual(queryData.vars, []);
	});

	it('return query parts with one item', function() {
		const queryData = Helpers.getInsertQueryData([
			{ field: 'email', input: 'ralph@lauren.com', rules: { notEmpty: true, type: 'string' } } ]);

		Assert.equal(queryData.fieldQuery, '(email)');
		Assert.equal(queryData.valueQuery, '($1)');
		Assert.deepEqual(queryData.vars, [ 'ralph@lauren.com' ]);
	});

	it('return query parts with multiple items', function() {
		const queryData = Helpers.getInsertQueryData([
			{ field: 'full_name', input: 'Peter Pan', rules: { notEmpty: true, type: 'string' } },
			{ field: 'counter', input: 9, rules: { notEmpty: true, type: 'number' } },
			{ field: 'username', input: 'pan99', rules: { notEmpty: true, type: 'string' } }
		]);

		Assert.equal(queryData.fieldQuery, '(full_name,counter,username)');
		Assert.equal(queryData.valueQuery, '($1,$2,$3)');
		Assert.deepEqual(queryData.vars, [ 'Peter Pan', 9, 'pan99' ]);
	});
};
