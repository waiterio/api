'use strict';

const Request = require('supertest');

module.exports = function() {
	let server;

	beforeEach(function(done) {
		server = require('../../helpers/mockServer.js');
		server.get('db').db.serialize(function() {
			server.get('db').db.run('DELETE FROM orderitems');
			server.get('db').db.run('DELETE FROM orders');
			done();
		})
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
				.expect(expectedOrderData, done);
		});
	});

	it('return a single order with two orderitems', function() {
		// TODO: test missing
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
				.expect(expectedResultList,done);
		});
	});
};
