'use strict';

const Request = require('supertest');

module.exports = function() {
	let server;

	beforeEach(function(done) {
		server = require('../../helpers/mockServer.js');
		server.get('db').db.run('DELETE FROM dishes', done);
	});

	it('create a dish', function(done) {
		const postData = { name: 'pizza quattro formaggi', price: 930 };

		Request(server)
			.post('/api/dishes/')
			.send(postData)
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect({ id: 1 }, done);
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
