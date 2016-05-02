'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('return a single user', function(done) {
		server.get('db').db.run('INSERT INTO users (username, password, role, email) VALUES(?, ?, ?, ?)', [ 'superuser', 'pw', 'user', 'super@user.com' ], function() {
			const userId = this.lastID;
			const expectedUserData = {
				email: "super@user.com",
				id: 1,
				password: 'pw',
				role: 'user',
				username: 'superuser'
			};

			Request(server)
				.get('/api/users/' + userId)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(expectedUserData)
				.end(function(error) {
					server.get('db').db.run('DELETE FROM users WHERE id = ?', userId, function() {
						if (error) return done(error);
						done();
					});
				});
		});
	});


	it('fail when id is not a number', function(done) {
		Request(server)
			.get('/api/users/abc')
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for id (\'NaN\') is not of type number' }, done);
	});

	it('return a all users', function(done) {
		server.get('db').db.serialize(function() {
			const addUserQuery = 'INSERT INTO users (username, password, role, email) VALUES(?, ?, ?, ?)'

			server.get('db').db.run(addUserQuery, [ 'generic', 'secret', 'user', 'g@neric.com' ]);
			server.get('db').db.run(addUserQuery, [ 'admin', 'mydogsname', 'admin', 'admin@waiter.io' ]);
			server.get('db').db.run(addUserQuery, [ 'guest', 'guest', 'guest', 'guest@waiter.io' ]);

			const expectedResultList = [
				{ id: 1, username: 'generic', email: 'g@neric.com', password: 'secret', role: 'user' },
				{ id: 2, username: 'admin', email: 'admin@waiter.io', password: 'mydogsname', role: 'admin' },
				{ id: 3, username: 'guest', email: 'guest@waiter.io', password: 'guest', role: 'guest' }
			];

			Request(server)
				.get('/api/users/')
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(expectedResultList)
				.end(function(error) {
					if (error) return done(error);
					server.get('db').db.run('DELETE FROM users WHERE id IN (?,?,?)', [ 1, 2, 3 ], function() {
						done();
					});
				});
		});
	});
};
