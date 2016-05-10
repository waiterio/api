'use strict';

const Request = require('supertest');

module.exports = function() {
	let server;

	beforeEach(function(done) {
		server = require('../../helpers/mockServer.js');
		server.get('db').db.run('DELETE FROM dishes', done);
	});

	it('delete a single dish', function(done) {
		server.get('db').db.run('INSERT INTO dishes (name, price) VALUES(?, ?)', [ 'spaghetti', 2399 ], function() {
			const dishId = this.lastID;

			Request(server)
				.delete('/api/dishes/' + dishId)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect({ status: 200, message: 'success' }, done);
		});
	});

	it('fail when id is not a number', function(done) {
		Request(server)
			.delete('/api/dishes/abc')
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for id (\'NaN\') is not of type number' }, done);
	});
};
