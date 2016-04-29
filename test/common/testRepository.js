'use strict';

const Assert = require('chai').assert;
const Repo = require('../../common/repository.js');

describe('database repository should', function() {
	const dbMockFunction = function(query, params) {
		return { query: query, params: params }
	};

	const dbMock = {
		one: dbMockFunction,
		oneOrNone: dbMockFunction,
		none: dbMockFunction,
		any: dbMockFunction
	};

	const defaultQueryOptions = { table: 'users' };
	const defaultDbData = { fieldQuery: '(email,name)', valueQuery: '($1,$2)', vars: [ 'kaiser@wilhelm.de', 'K Willy' ] };

	it('return the correct add query', function() {
		const returnValue = Repo.getRepo(dbMock).add(defaultQueryOptions, defaultDbData);

		Assert.equal(returnValue.query, 'INSERT INTO users (email,name) VALUES ($1,$2) RETURNING id');
		Assert.deepEqual(returnValue.params, [ 'kaiser@wilhelm.de', 'K Willy' ]);
	});

	it('return the correct update query', function() {
		const returnValue = Repo.getRepo(dbMock).update(defaultQueryOptions, defaultDbData, 19);

		Assert.equal(returnValue.query, 'UPDATE users SET (email,name) = ($1,$2) WHERE id = 19');
		Assert.deepEqual(returnValue.params, [ 'kaiser@wilhelm.de', 'K Willy' ]);
	});

	it('return the correct remove query', function() {
		const returnValue = Repo.getRepo(dbMock).remove(defaultQueryOptions, 22);

		Assert.equal(returnValue.query, 'DELETE FROM users WHERE id = $1');
		Assert.equal(returnValue.params, 22);
	});

	it('return the correct getAll query', function() {
		const returnValue = Repo.getRepo(dbMock).getAll(defaultQueryOptions);
		Assert.equal(returnValue.query, 'SELECT * FROM users');
	});

	it('return the correct getSingle query', function() {
		const returnValue = Repo.getRepo(dbMock).getSingle(defaultQueryOptions, 49);
		Assert.equal(returnValue.query, 'SELECT * FROM users WHERE id = $1 LIMIT 1');
		Assert.equal(returnValue.params, 49);
	});
});
