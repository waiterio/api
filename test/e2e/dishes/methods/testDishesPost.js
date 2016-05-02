'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('create a dish', function(done) {
		const postData = { name: 'dish1', price: 1299 };

		Request(server)
			.post('/api/dishes/')
			.send(postData)
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(error, res) {
				Assert.isNumber(res.body.id);
				server.get('db').db.run('DELETE FROM dishes WHERE id = ?', res.body.id, function() {
					done();
				});
			});
	});

	it('fail when data is missing', function(done) {
		Request(server)
			.post('/api/dishes/')
			.send()
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for price (\'undefined\') is not of type number' }, done);
	});
};
