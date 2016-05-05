'use strict';

const Request = require('supertest');

module.exports = function() {
	let server;

	beforeEach(function(done) {
		server = require('../../helpers/mockServer.js');
		server.get('db').db.run('DELETE FROM users', done);
	});

	it('update a user', function(done) {
		const postData = { username: 'new_bae' };

		server.get('db').db.run('INSERT INTO users (username, password, role, email) VALUES(?, ?, ?, ?)', [ 'superuser', 'pw', 'user', 'super@user.com' ], function() {
			let userId = this.lastID;

			Request(server)
				.put('/api/users/' + userId)
				.send(postData)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect({ status: 200, message: 'success' }, done);
		});
	});

	it('allow when data is missing', function(done) {
		Request(server)
			.put('/api/users/1')
			.send()
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('fail when data is invalid', function(done) {
		Request(server)
			.put('/api/users/1')
			.send({ username: 29 })
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for username (\'29\') is not of type string' }, done);
	});
};
