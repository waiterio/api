const DBHelpers = require('../../../../common/databaseHelpers.js');
const Assert = require('chai').assert;

module.exports = function() {
	it('return empty strings without data', function() {
		const queryData = DBHelpers.getUpdateQueryData();

		Assert.equal(queryData.updateQuery, '');
		Assert.deepEqual(queryData.vars, []);
	});

	it('return query parts with one item', function() {
		const queryData = DBHelpers.getUpdateQueryData([
			{ field: 'email', input: 'ralph@lauren.com', rules: { notEmpty: true, type: 'string' } } ]);

		Assert.equal(queryData.updateQuery, 'email=?');
		Assert.deepEqual(queryData.vars, [ 'ralph@lauren.com' ]);
	});

	it('return query parts with multiple items', function() {
		const queryData = DBHelpers.getUpdateQueryData([
			{ field: 'full_name', input: 'Peter Pan', rules: { notEmpty: true, type: 'string' } },
			{ field: 'counter', input: 9, rules: { notEmpty: true, type: 'number' } },
			{ field: 'username', input: 'pan99', rules: { notEmpty: true, type: 'string' } }
		]);

		Assert.equal(queryData.updateQuery, 'full_name=?,counter=?,username=?');
		Assert.deepEqual(queryData.vars, [ 'Peter Pan', 9, 'pan99' ]);
	});
};
