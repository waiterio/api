var request = require('supertest');

describe('the api should', function() {
	var server;

	beforeEach(function() {
		server = require('../server.js');
	});

	it('return a 404 when the endpoint does not exist', function testNonExistentEndpoint(done) {
		request(server).get('/nonexistent')
			.expect(404, done);
	});
});
