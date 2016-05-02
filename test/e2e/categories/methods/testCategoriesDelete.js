'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('delete a single category', function(done) {
		server.get('db').db.run('INSERT INTO categories (name) VALUES(\'test category\')', function(error) {
			if (error !== null) {
				throw new Error('could not insert data');
			}

			Request(server)
				.delete('/api/categories/' + this.lastID)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect({ status: 200, message: 'success' }, done);
		});
	});

	it('fail when id is not a number', function(done) {
		Request(server)
			.delete('/api/categories/avc')
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for id (\'NaN\') is not of type number' }, done);
	});
};
