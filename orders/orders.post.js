'use strict';

const Validator = require('../common/validator.js');

module.exports.addOrder = function(req, res) {
	const orderItems = req.body.orderitems;

	const orderData = [
		{ field: 'notes', input: req.body.notes, rules: { notEmpty: false, type: 'string' } },
		{ field: 'tablenumber', input: req.body.tablenumber, rules: { notEmpty: true, type: 'number' } },
		{ field: 'orderitems', input: orderItems, rules: { notEmpty: true, type: 'object' } }
	];

	const validationResult = Validator.validate(orderData);

	if (validationResult.status === true) {
		const orderItemsQuery = [];
		let dishesId;

		orderItems.forEach(function(value) {
			dishesId = parseInt(value.dishes_id, 10);
			orderItemsQuery.push(`((SELECT (id) FROM ordertable), ${dishesId})`);
		});

		const orderItemValues = orderItemsQuery.join(', ');

		req.app.get('db').query('WITH ordertable AS (INSERT INTO orders(tablenumber, ordertimestamp, notes) VALUES($1, now(), $2) RETURNING id) ' +
			`INSERT INTO orderitems(orders_id, dishes_id) VALUES ${orderItemValues}`, [ req.body.tablenumber, req.body.notes ])

			.then(function() {
				return res.status(200).end();
			})
			.catch(function(error) {
				return res.status(500).json(error);
			});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
