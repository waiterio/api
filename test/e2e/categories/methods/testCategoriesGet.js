'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('return a single category', function(done) {
		server.get('db').db.serialize(function() {
			server.get('db').db.run('INSERT INTO categories (name) VALUES(\'test category\')', function() {
				Request(server)
					.get('/api/categories/' + this.lastID)
					.expect('Access-Control-Allow-Origin', '*')
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						Assert.equal(res.status, 200);
					});
			});

			server.get('db').db.run('DELETE FROM categories WHERE name = \'test category\'', function() {
				done();
			});
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
			server.get('db').db.run('INSERT INTO categories (name) VALUES(\'sides\')');
			server.get('db').db.run('INSERT INTO categories (name) VALUES(\'burgers\')');
			server.get('db').db.run('INSERT INTO categories (name) VALUES(\'drinks and cocktails\')');

			const expectedResultList = [
				{ id: 1, name: 'sides' },
				{ id: 2, name: 'burgers' },
				{ id: 3, name: 'drinks and cocktails' }
			];

			Request(server)
				.get('/api/categories/')
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(expectedResultList)
				.end(function() {
					server.get('db').db.run('DELETE FROM categories WHERE name IN (\'sides\',\'burgers\',\'drinks and cocktails\')', function() {
						done();
					});
				});
		});
	});
};
