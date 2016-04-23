var request = require('supertest');

describe('main server', function() {
	var server;

	beforeEach(function() {
		server = require('../server.js');
	});

	it('404 when the endpoint does not exist', function testNonExistentEndpoint(done) {
		request(server)
			.get('/nonexistent')
			.expect(404, { status: 404, message: 'Not found' }, done)
	});
});
