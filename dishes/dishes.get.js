'use strict';

const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getDishes = function(req, res) {
	const orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	const limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getRecords({ table: 'dishes', orderBy: orderBy, limit: limit }, function(error, data) {
		if (error !== null) {
			return res.status(500).json(error);
		}

		return res.json(data);
	});
};

module.exports.getDish = function(req, res) {
	const dishId = parseInt(req.params.id, 10);

	req.app.get('db').action.getRecord({ table: 'dishes' }, dishId, function(error, data) {
		if (error !== null) {
			return res.status(500).json(error);
		}

		return res.json(data);
	});
};
