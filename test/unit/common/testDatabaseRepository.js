'use strict';

const Assert = require('chai').assert;

const Repository = require('../../../common/databaseRepository.js');

describe('database repository should', function() {
	const mockFunctionWithReplacements = function(query, replacementVariables, callback) {
		callback(query, replacementVariables);
	};

	const mockFunctionWithoutReplacements = function(query, callback) {
		callback(query);
	};

	const dbMock = {
		run: mockFunctionWithReplacements,
		all: mockFunctionWithoutReplacements,
		get: mockFunctionWithoutReplacements
	};

	const defaultId = 93;
	const defaultQueryOptions = { table: 'users' };
	const defaultDbInsertData = { fieldQuery: '(email,name)', valueQuery: '(?,?)', vars: [ 'kaiser@wilhelm.de', 'K Willy' ] };
	const defaultDbUpdateData = { updateQuery: 'email=?,name=?', vars: [ 'kaiser@wilhelm.de', 'K Willy' ] };

	it('return the correct addRecord query', function() {
		Repository.getRepo(dbMock).addRecord(defaultQueryOptions, defaultDbInsertData, function(query, replacementVariables) {
			Assert.equal(query, 'INSERT INTO users (email,name) VALUES (?,?)');
			Assert.deepEqual(replacementVariables, [ 'kaiser@wilhelm.de', 'K Willy' ]);
		});
	});

	it('return the correct updateRecord query', function() {
		Repository.getRepo(dbMock).updateRecord(defaultQueryOptions, defaultDbUpdateData, defaultId, function(query, replacementVariables) {
			Assert.equal(query, 'UPDATE users SET email=?,name=? WHERE id = 93');
			Assert.deepEqual(replacementVariables, [ 'kaiser@wilhelm.de', 'K Willy' ]);
		});
	});

	it('return the correct deleteRecord query', function() {
		Repository.getRepo(dbMock).deleteRecord(defaultQueryOptions, defaultId, function(query, replacementVariables) {
			Assert.equal(query, 'DELETE FROM users WHERE id = ?');
			Assert.deepEqual(replacementVariables, defaultId);
		});
	});

	it('return the correct getRecords query', function() {
		Repository.getRepo(dbMock).getRecords(defaultQueryOptions, function(query) {
			Assert.equal(query, 'SELECT * FROM users');
		});
	});

	it('return the correct getRecord query', function() {
		Repository.getRepo(dbMock).getRecord(defaultQueryOptions, defaultId, function(query) {
			Assert.equal(query, 'SELECT * FROM users WHERE id = 93');
		});
	});
});
