'use strict';

const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getOrders = function(req, res) {
	const orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	const limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getRecords({ table: 'orders', orderBy: orderBy, limit: limit }, function(error, data) {
		if (error !== null) {
			return res.status(500).json(error);
		}

		return res.json(data);
	});
};

module.exports.getOrder = function(req, res) {
	const orderId = parseInt(req.params.id, 10);

	req.app.get('db').action.getRecord({ table: 'orders' }, orderId, function(error, orderRow) {
		let orderObject = orderRow;

		const orderItemQuery = 'SELECT orderitems.id, dishes.name, dishes.price, dishes.description, dishes.id as dishes_id ' +
			'FROM orderitems JOIN dishes ON orderitems.dishes_id = dishes.id ' +
			'WHERE orders_id = ?';

		if (error !== null) {
			return res.status(500).json(error);
		}

		req.app.get('db').db.all(orderItemQuery, orderObject.id, function(error, orderItemRows) {
			if (error !== null) {
				return res.status(500).json(error);
			}

			orderObject.orderitems = orderItemRows;
			return res.json(orderObject);
		});
	});
};
