'use strict';

const dbHelpers = require('../../common/databaseHelpers.js');
const validator = require('../../common/validator.js');

module.exports.addOrder = function(req, res) {
	const orderItems = req.body.orderitems;
	const orderData = [
		{ field: 'notes', input: req.body.notes, rules: { notEmpty: false, type: 'string' } },
		{ field: 'ordertimestamp', input: new Date().getTime().toString(), rules: { notEmpty: true, type: 'string' } },
		{ field: 'tablenumber', input: req.body.tablenumber, rules: { notEmpty: true, type: 'number' } }
	];
	const validationResult = validator.validate(orderData);

	if (validationResult.status === true) {
		req.app.get('db').db.serialize(function() {
			req.app.get('db').action.addRecord({ table: 'orders' }, dbHelpers.getInsertQueryData(orderData), function() {
				const orderId = this.lastID;
				req.app.get('db').db.serialize(function() {
					orderItems.forEach(function(value) {
						const orderItemData = [
							{ field: 'orders_id', input: parseInt(orderId, 10), rules: { notEmpty: true, type: 'number' } },
							{ field: 'dishes_id', input: parseInt(value.dishes_id, 10), rules: { notEmpty: true, type: 'number' } }
						];
						const validationResultOrderItem = validator.validate(orderItemData);

						if (validationResultOrderItem.status === true) {
							req.app.get('db').action.addRecord({ table: 'orderitems' }, dbHelpers.getInsertQueryData(orderItemData));
						}
					});
				});

				return res.json({ id: orderId });
			});
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
