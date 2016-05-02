'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('return a single dish', function(done) {
		server.get('db').db.run('INSERT INTO dishes (name, price) VALUES(?, ?)', [ 'tuna burger', 980 ], function() {
			const dishId = this.lastID;

			const expectedDishData = {
				"categories_id": null,
				"description": null,
				"id": 1,
				"image": null,
				"name": "tuna burger",
				"price": 980
			};

			Request(server)
				.get('/api/dishes/' + dishId)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(expectedDishData)
				.end(function(error) {
					server.get('db').db.run('DELETE FROM dishes WHERE id = ?', [ dishId ], function() {
						if (error) return done(error);
						done();
					});
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
			const addDishQuery = 'INSERT INTO dishes (name, price) VALUES(?, ?)';

			server.get('db').db.run(addDishQuery, [ 'cheeseburger', 700 ]);
			server.get('db').db.run(addDishQuery, [ 'avocado sauce', 150 ]);
			server.get('db').db.run(addDishQuery, [ 'sweet potato fries', 300 ]);

			const expectedResultList = [
				{ categories_id: null, description: null, image: null, id: 1, name: 'cheeseburger', price: 700 },
				{ categories_id: null, description: null, image: null, id: 2, name: 'avocado sauce', price: 150 },
				{ categories_id: null, description: null, image: null, id: 3, name: 'sweet potato fries', price: 300 }
			];

			Request(server)
				.get('/api/dishes/')
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(expectedResultList)
				.end(function(error) {
					server.get('db').db.run('DELETE FROM categories WHERE id IN (?)', [ 1, 2, 3 ].join(','), function() {
						if (error) return done(error);
						done();
					});
				});
		});
	});
};
