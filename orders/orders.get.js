const Postgres = require('../common/postgres.js').getConnection();
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getOrders = function(req, res) {
	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);

	Postgres.query('SELECT * FROM orders' + orderBy)
		.then(function(data) {
			return res.json(data);
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};

module.exports.getOrder = function(req, res) {
	var orderId = parseInt(req.params.id);

	Postgres.task(function(db) {
		return db.batch([
			db.oneOrNone('SELECT * FROM orders WHERE id = $1', [ orderId ]),
			db.manyOrNone('SELECT orderitems.id, dishes.name, dishes.price, dishes.description, dishes.id as dishes_id ' +
							'FROM orderitems JOIN dishes ON orderitems.dishes_id = dishes.id ' +
							'WHERE orders_id = $1', [ orderId ]) ]);
	})
		.spread(function(order, orderItems) {
			if(order !== null){
				order.orderitems = orderItems;
				return res.json(order);
			} else {
				return res.status(204).end();
			}
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};
