var request = require('supertest');

describe('validating request', function() {
	var server;

	beforeEach(function() {
		server = require('../../server.js');
	});

	it('error when the token is missing', function testMissingTokenValidateRequest(done) {
		request(server)
			.get('/api/orders')
			.set('access-token', '')
			.expect(401, { status: 401, message: 'Invalid Token or Key' }, done)
	});

	it('error when the token is invalid', function testInvalidTokenValidateRequest(done) {
		request(server)
			.get('/api/orders')
			.set('access-token', 'an.invalid.token')
			.expect(401, { status: 401, message: 'Invalid Token or Key' }, done)
	});

	it('error when the token is expired', function testInvalidTokenValidateRequest(done) {
		request(server)
			.get('/api/orders')
			.set('access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzIjoxNDYxMTYwOTM0MDUyLCJ1c2VybmFtZSI6Imd1ZXN0Iiwicm9sZSI6ImFkbWluIn0.ZoWRsbTI_tG_Oa0AXQWCoQU_fkTtirXFcTbWBQDpHWs')
			.expect(400, { status: 400, message: 'Token Expired' }, done)
	});
});
