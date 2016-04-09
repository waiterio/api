const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getOrders = function(req, res) {
	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	var limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getAll({table: 'orders', orderBy: orderBy, limit: limit})
		.then(function(data) {
			if(data !== null) {
				return res.json(data);
			} else {
				return res.status(204).end();
			}
		})
		.catch(function(error) {
			req.app.get('log').error('getting all orders failed', { pgError: error });
			return res.status(500).json(error);
		});
};

module.exports.getOrder = function(req, res) {
	var orderId = parseInt(req.params.id);

	req.app.get('db').task(function(db) {
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
			req.app.get('log').error('getting order with id %s failed', orderId, { pgError: error });
			return res.status(500).json(error);
		});
};
