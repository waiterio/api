'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('return a single dish', function(done) {
		server.get('db').db.serialize(function() {
			server.get('db').db.run('INSERT INTO dishes (name,price) VALUES(\'test dish\',2250)', function() {
				Request(server)
					.get('/api/dishes/' + this.lastID)
					.expect('Access-Control-Allow-Origin', '*')
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						Assert.equal(res.status, 200);
					});
			});

			server.get('db').db.run('DELETE FROM dishes WHERE name = \'test dish\' AND price = 2250', function() {
				done();
			});
		});
	});

	it('fail when id is not a number', function(done) {
		Request(server)
			.get('/api/dishes/abc')
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for id (\'NaN\') is not of type number' }, done);
	});

	it('return a all dishes', function(done) {

		server.get('db').db.serialize(function() {
			server.get('db').db.run('INSERT INTO dishes (name,price) VALUES(\'cheeseburger\', 1450)');
			server.get('db').db.run('INSERT INTO dishes (name,price) VALUES(\'fries\', 299)');
			server.get('db').db.run('INSERT INTO dishes (name,price) VALUES(\'pizza\', 1999)');

			const expectedResultList = [
				{ categories_id: null, description: null, image: null, id: 1, name: 'cheeseburger', price: 1450 },
				{ categories_id: null, description: null, image: null, id: 2, name: 'fries', price: 299 },
				{ categories_id: null, description: null, image: null, id: 3, name: 'pizza', price: 1999 },
			];

			Request(server)
				.get('/api/dishes/')
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(expectedResultList)
				.end(function() {
					server.get('db').db.run('DELETE FROM categories WHERE name IN (\'cheeseburger\',\'fries\',\'pizza\')', function() {
						done();
					});
				});
		});
	});
};
