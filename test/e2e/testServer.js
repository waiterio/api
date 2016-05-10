'use strict';

const Request = require('supertest');

describe('server should return', function() {
	let server;

	beforeEach(function() {
		server = require('./helpers/mockServer.js');
	});

	it('consistent cross site origin headers', function(done) {
		Request(server)
			.get('/')
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/, done);
	});

	it('a 404 when the endpoint does not exist', function(done) {
		Request(server)
			.get('/nonexistent')
			.expect(404)
			.expect({ status: 404, message: 'Not found' }, done);
	});
});
