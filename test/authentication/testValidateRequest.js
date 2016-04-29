var request = require('supertest');

describe('validating the request should', function() {
	var server;

	beforeEach(function() {
		server = require('../../server.js');
	});

	it('fail when the token is missing', function (done) {
		request(server)
			.get('/api/orders')
			.set('access-token', '')
			.expect(401, { status: 401, message: 'Invalid Token or Key' }, done)
	});

	it('fail when the token is invalid', function (done) {
		request(server)
			.get('/api/orders')
			.set('access-token', 'an.invalid.token')
			.expect(401, { status: 401, message: 'Invalid Token or Key' }, done)
	});

	it('fail when the token is expired', function (done) {
		request(server)
			.get('/api/orders')
			.set('access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzIjoxNDYxMTYwOTM0MDUyLCJ1c2VybmFtZSI6Imd1ZXN0Iiwicm9sZSI6ImFkbWluIn0.ZoWRsbTI_tG_Oa0AXQWCoQU_fkTtirXFcTbWBQDpHWs')
			.expect(400, { status: 400, message: 'Token Expired' }, done)
	});
});
