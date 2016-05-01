'use strict';

const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getUsers = function(req, res) {
	const orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	const limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getRecords({ table: 'users', orderBy: orderBy, limit: limit }, function(error, data) {
		if (error !== null) {
			return res.status(500).json(error);
		}

		return res.json(data);
	});
};

module.exports.getUser = function(req, res) {
	const userId = parseInt(req.params.id, 10);

	req.app.get('db').action.getRecord({ table: 'users' }, userId, function(error, data) {
		if (error !== null) {
			return res.status(500).json(error);
		}

		return res.json(data);
	});
};
