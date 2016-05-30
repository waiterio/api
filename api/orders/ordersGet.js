'use strict';

const dbHelpers = require('../../common/databaseHelpers.js');
const validator = require('../../common/validator.js');

module.exports.getOrders = function(req, res) {
	const orderBy = dbHelpers.getOrderByQuery(req.query.sort);
	const limit = dbHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getRecords({ table: 'orders', orderBy: orderBy, limit: limit }, function(error, data) {
		return res.json(data);
	});
};

module.exports.getOrder = function(req, res) {
	const orderId = parseInt(req.params.id, 10);
	const orderData = [
		{ field: 'id', input: orderId, rules: { notEmpty: true, type: 'number' } }
	];
	const validationResult = validator.validate(orderData);

	if (validationResult.status === true) {
		req.app.get('db').action.getRecord({ table: 'orders' }, orderId, function(error, orderRow) {
			const orderObject = orderRow;
			const orderItemQuery = 'SELECT orderitems.id, dishes.name, dishes.price, dishes.description, dishes.id as dishes_id ' +
				'FROM orderitems JOIN dishes ON orderitems.dishes_id = dishes.id ' +
				'WHERE orders_id = ?';

			req.app.get('db').db.all(orderItemQuery, orderObject.id, function(errorOrderItem, orderItemRows) {
				orderObject.orderitems = orderItemRows;
				return res.json(orderObject);
			});
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message })
	}
};
