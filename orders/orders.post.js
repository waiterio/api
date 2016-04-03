const Postgres = require('../common/postgres.js').getConnection();

module.exports.addOrder = function(req, res) {
	var notes = '';
	var tablenumber = parseInt(req.body.tablenumber);
	var orderItems = req.body.orderitems;
	var orderItemsQuery = [];

	if(typeof req.body.notes !== 'undefined') {
		notes = req.body.notes.toString();
	}

	orderItems.forEach(function(value) {
		orderItemsQuery.push('((SELECT (id) FROM ordertable), ' + parseInt(value.dishes_id) + ')')
	});

	Postgres.query('WITH ordertable AS (INSERT INTO orders(tablenumber, ordertimestamp, notes) ' +
					'VALUES(\'' + tablenumber + '\', now(), \'' + notes + '\') RETURNING id) ' +
				   	'INSERT INTO orderitems(orders_id, dishes_id) VALUES ' + orderItemsQuery.join(', '))
		.then(function() {
			return res.status(200).end();
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};
