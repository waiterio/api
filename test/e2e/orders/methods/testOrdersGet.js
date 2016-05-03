'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('return a single order without orderitems', function(done) {
		const consistentTimestamp = new Date().getTime();
		server.get('db').db.run('INSERT INTO orders (tablenumber, ordertimestamp) VALUES(?, ?)', [ 8, consistentTimestamp ], function() {
			const orderId = this.lastID;
			const expectedOrderData = {
				id: 1,
				notes: null,
				orderitems: [],
				ordertimestamp: consistentTimestamp,
				servingtimestamp: null,
				tablenumber: 8
			};

			Request(server)
				.get('/api/orders/' + orderId)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(expectedOrderData)
				.end(function(error) {
					server.get('db').db.run('DELETE FROM orders WHERE id = ?', [ orderId ], function() {
						if (error) return done(error);
						done();
					});
				});
		});
	});

	it('return a single order with two orderitems', function(done) {
		// TODO: test missing
		done();
	});

	it('fail when id is not a number', function(done) {
		Request(server)
			.get('/api/orders/abc')
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for id (\'NaN\') is not of type number' }, done);
	});

	it('return a all orders', function(done) {
		server.get('db').db.serialize(function() {
			const addOrderQuery = 'INSERT INTO orders (tablenumber, ordertimestamp) VALUES (?, ?)';
			const consistentTimestamp = new Date().getTime();

			server.get('db').db.run(addOrderQuery, [ 1, consistentTimestamp ]);
			server.get('db').db.run(addOrderQuery, [ 4, consistentTimestamp ]);
			server.get('db').db.run(addOrderQuery, [ 5, consistentTimestamp ]);

			const expectedResultList = [
				{ id: 1, notes: null, ordertimestamp: consistentTimestamp, servingtimestamp: null, tablenumber: 1 },
				{ id: 2, notes: null, ordertimestamp: consistentTimestamp, servingtimestamp: null, tablenumber: 4 },
				{ id: 3, notes: null, ordertimestamp: consistentTimestamp, servingtimestamp: null, tablenumber: 5 }
			];

			Request(server)
				.get('/api/orders/')
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(expectedResultList)
				.end(function(error) {
					server.get('db').db.run('DELETE FROM orders WHERE id IN (?)', [ 1, 2, 3 ].join(','), function() {
						if (error) return done(error);
						done();
					});
				});
		});
	});
};
