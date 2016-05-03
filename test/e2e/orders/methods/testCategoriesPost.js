'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('create a category', function(done) {
		const postData = { name: 'special category' };

		Request(server)
			.post('/api/categories/')
			.send(postData)
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect({ id: 4 })
			.end(function(error) {
				server.get('db').db.run('DELETE FROM categories WHERE id = ?', [ 1 ], function() {
					if (error) return done(error);
					done();
				});
			});
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
