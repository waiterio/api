'use strict';

const Request = require('supertest');

module.exports = function() {
	let server;

	beforeEach(function(done) {
		server = require('../../helpers/mockServer.js');
		server.get('db').db.run('DELETE FROM users', done);
	});

	it('create a user', function(done) {
		this.slow(500);

		const postData = {
			username: 'super_admin_user_98',
			email: 'admin@super.user',
			role: 'client',
			password: 'kittens'
		};

		Request(server)
			.post('/api/users/')
			.send(postData)
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect({ id: 1 }, done);
	});

	it('fail when data is missing', function(done) {
		Request(server)
			.post('/api/users/')
			.send()
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(411)
			.expect({ status: 411, message: 'input for email should not be empty' }, done);
	});
};
