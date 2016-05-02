'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('create a category', function(done) {
		const postData = { name: 'category1' };

		Request(server)
			.post('/api/categories/')
			.send(postData)
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(error, res) {
				Assert.isNumber(res.body.id);
				server.get('db').db.run('DELETE FROM categories WHERE id = ?', res.body.id, function() {
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
