'use strict';

const Request = require('supertest');

describe('server should return', function() {
	let server;

	beforeEach(function() {
		server = require('../server.js');
	});

	it('a 404 when the endpoint does not exist', function (done) {
		Request(server)
			.get('/nonexistent')
			.expect(404, { status: 404, message: 'Not found' }, done);
	});
});
