'use strict';

const Request = require('supertest');

describe('main server', function() {
	let server;

	beforeEach(function() {
		server = require('../server.js');
	});

	it('404 when the endpoint does not exist', function testNonExistentEndpoint(done) {
		Request(server)
			.get('/nonexistent')
			.expect(404, { status: 404, message: 'Not found' }, done);
	});
});
