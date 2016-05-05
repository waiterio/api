'use strict';

const Request = require('supertest');

module.exports = function() {
	let server;

	beforeEach(function(done) {
		server = require('../../helpers/mockServer.js');
		server.get('db').db.run('DELETE FROM users', done);
	});

	it('delete a single user', function(done) {
		server.get('db').db.run('INSERT INTO users (username, password, role, email) VALUES(?, ?, ?, ?)', [ 'anonymous', 'mine', 'admin', 'anon@blackhat.com' ], function() {
			const userId = this.lastID;

			Request(server)
				.delete('/api/users/' + userId)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect({ status: 200, message: 'success' }, done);
		});
	});

	it('fail when id is not a number', function(done) {
		Request(server)
			.delete('/api/users/avc')
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for id (\'NaN\') is not of type number' }, done);
	});
};
