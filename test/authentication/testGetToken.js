'use strict';

const Request = require('supertest');
const Sinon = require('sinon');
const Postgres = require('pg-promise');
const Promises = require('bluebird');
const SinonStubPromise = require('sinon-stub-promise');
const Settings = require('../../settings.js');
const Repository = require('../../common/repository.js');
const Passwords = require('../../common/passwords.js');

SinonStubPromise(Sinon);

describe('getting a user token', function() {
	const pgp = Postgres({ promiseLib: Promises, noLocking: true, extend: function(db) { this.action = Repository.getRepo(db); } });
	let server;

	beforeEach(function() {
		let db = pgp(Settings.database);
		let stubOneOrNone = Sinon.stub().returnsPromise();
		let userObject = {};

		server = require('../../server.js');

		userObject.password = Passwords.hashPassword('superSecretPassword123');
		userObject.name = 'marcus';
		userObject.role = 'admin';
		userObject.email = 'marcus@waiter.io';

		stubOneOrNone.resolves(userObject);

		db.oneOrNone = stubOneOrNone;
		server.set('db', db);
	});

	it('with a valid password', function testNonExistentEndpoint(done) {
		Request(server)
			.post('/auth/token')
			.send({ username: 'marcus', password: 'superSecretPassword123' })
			.expect(200, done);
	});

	it('an invalid password should fail', function testNonExistentEndpoint(done) {
		Request(server)
			.post('/auth/token')
			.send({ username: 'marcus', password: 'failure' })
			.expect(401, { status: 401, message: 'Invalid credentials' }, done);
	});

	it('a missing password should fail', function testNonExistentEndpoint(done) {
		Request(server)
			.post('/auth/token')
			.send({ username: 'marcus' })
			.expect(401, { status: 401, message: 'Invalid credentials' }, done);
	});

	it('a missing username should fail', function testNonExistentEndpoint(done) {
		Request(server)
			.post('/auth/token')
			.send({ password: 'mySecret' })
			.expect(401, { status: 401, message: 'Invalid credentials' }, done);
	});

	it('no information should fail', function testNonExistentEndpoint(done) {
		Request(server)
			.post('/auth/token')
			.expect(401, { status: 401, message: 'Invalid credentials' }, done);
	});
});
