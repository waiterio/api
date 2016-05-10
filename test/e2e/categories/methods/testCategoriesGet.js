'use strict';

const Request = require('supertest');

module.exports = function() {
	let server;

	beforeEach(function(done) {
		server = require('../../helpers/mockServer.js');
		server.get('db').db.run('DELETE FROM categories', done)
	});

	it('return a single category', function(done) {
		server.get('db').db.run('INSERT INTO categories (name) VALUES(?)', [ 'super meals' ], function() {
			const categoryId = this.lastID;

			Request(server)
				.get('/api/categories/' + categoryId)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect({ id: 1, name: 'super meals' }, done);
		});
	});

	it('fail when id is not a number', function(done) {
		Request(server)
			.get('/api/categories/abc')
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for id (\'NaN\') is not of type number' }, done);
	});

	it('return a all categories', function(done) {
		server.get('db').db.serialize(function() {
			const addCategoryQuery = 'INSERT INTO categories (name) VALUES (?)';

			server.get('db').db.run(addCategoryQuery, [ 'wine' ]);
			server.get('db').db.run(addCategoryQuery, [ 'burgers' ]);
			server.get('db').db.run(addCategoryQuery, [ 'vegan' ], function() {

				const expectedResultList = [
					{ id: 1, name: 'wine' },
					{ id: 2, name: 'burgers' },
					{ id: 3, name: 'vegan' }
				];

				Request(server)
					.get('/api/categories/')
					.expect('Access-Control-Allow-Origin', '*')
					.expect('Content-Type', /json/)
					.expect(200)
					.expect(expectedResultList, done);
			});
		});
	});
};
