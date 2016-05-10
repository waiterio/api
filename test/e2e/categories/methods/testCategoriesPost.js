'use strict';

const Request = require('supertest');

module.exports = function() {
	let server;

	beforeEach(function(done) {
		server = require('../../helpers/mockServer.js');
		server.get('db').db.run('DELETE FROM categories', done)
	});

	it('create a category', function(done) {
		const postData = { name: 'special category' };

		Request(server)
			.post('/api/categories/')
			.send(postData)
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect({ id: 1 }, done);
	});

	it('fail when data is missing', function(done) {
		Request(server)
			.post('/api/categories/')
			.send()
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(411)
			.expect({ status: 411, message: 'input for name should not be empty' }, done);
	});
};
