'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('update a category', function(done) {
		const postData = { name: 'categorySecret' };

		server.get('db').db.serialize(function() {
			server.get('db').db.run('INSERT INTO categories (name) VALUES(\'test category\')', function() {
				let categoryId = this.lastID;
				Request(server)
					.put('/api/categories/' + categoryId)
					.send(postData)
					.expect('Access-Control-Allow-Origin', '*')
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function() {
						server.get('db').db.run('DELETE FROM categories WHERE id = ?', categoryId, function() {
							done();
						});
					});
			});
		});
	});

	it('allow when data is missing', function(done) {
		Request(server)
			.put('/api/categories/1')
			.send()
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('fail when data is invalid', function(done) {
		Request(server)
			.put('/api/dishes/1')
			.send({ name: [ 1, 2, 3 ] })
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for name (\'1,2,3\') is not of type string' }, done);
	});
};
