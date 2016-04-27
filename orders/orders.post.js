const Validator = require('../common/validator.js');

module.exports.addOrder = function(req, res) {
	var orderItems = req.body.orderitems;

	var orderData = [
		{'field': 'notes', 'input': req.body.notes, 'rules': {'notEmpty': false, 'type': 'string'}},
		{'field': 'tablenumber', 'input': req.body.tablenumber, 'rules': {'notEmpty': true, 'type': 'number'}},
		{'field': 'orderitems', 'input': orderItems, 'rules': {'notEmpty': true, 'type': 'object'}}
	];

	var validationResult = Validator.validate(orderData);

	if(validationResult.status === true) {
		var orderItemsQuery = [];

		orderItems.forEach(function(value) {
			orderItemsQuery.push('((SELECT (id) FROM ordertable), ' + parseInt(value.dishes_id, 10) + ')')
		});

		req.app.get('db').query('WITH ordertable AS (INSERT INTO orders(tablenumber, ordertimestamp, notes) ' +
						'VALUES($1, now(), $2) RETURNING id) INSERT INTO orderitems(orders_id, dishes_id) VALUES ' +
						orderItemsQuery.join(', '), [ req.body.tablenumber, req.body.notes ])
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
