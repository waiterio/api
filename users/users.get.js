'use strict';

const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getUsers = function(req, res) {
	const orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	const limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getAll({ table: 'users', orderBy: orderBy, limit: limit })
		.then(function(data) {
			if (data !== null) {
				return res.json(data);
			}

			return res.status(204).end();
		})
		.catch(function(error) {
			req.app.get('log').error('getting all users failed', { pgError: error });
			return res.status(500).json(error);
		});
};

module.exports.getUser = function(req, res) {
	const userId = parseInt(req.params.id, 10);

	req.app.get('db').action.get({ table: 'users' }, userId)
		.then(function(data) {
			if (data !== null) {
				return res.json(data);
			}

			return res.status(204).end();
		})
		.catch(function(error) {
			req.app.get('log').error('getting user with id %s failed', userId, { pgError: error });
			return res.status(500).json(error);
		});
};
