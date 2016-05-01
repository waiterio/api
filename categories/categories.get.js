'use strict';

const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getCategories = function(req, res) {
	const orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	const limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getRecords({ table: 'categories', orderBy: orderBy, limit: limit }, function(error, data) {
		if (error !== null) {
			return res.status(500).json(error);
		}

		return res.json(data);
	});
};

module.exports.getCategory = function(req, res) {
	const categoryId = parseInt(req.params.id, 10);

	req.app.get('db').action.getRecord({ table: 'categories' }, categoryId, function(error, data) {
		if (error !== null) {
			return res.status(500).json(error);
		}

		return res.json(data);
	});
};
