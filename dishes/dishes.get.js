'use strict';

const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getDishes = function(req, res) {
	const orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	const limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getAll({ table: 'dishes', orderBy: orderBy, limit: limit })
		.then(function(data) {
			if (data !== null) {
				return res.json(data);
			}

			return res.status(204).end();
		})
		.catch(function(error) {
			req.app.get('log').error('getting all dishes failed', { pgError: error });
			return res.status(500).json(error);
		});
};

module.exports.getDish = function(req, res) {
	const dishId = parseInt(req.params.id, 10);

	req.app.get('db').action.getSingle({ table: 'dishes' }, dishId)
		.then(function(data) {
			if (data !== null) {
				return res.json(data);
			}

			return res.status(204).end();
		})
		.catch(function(error) {
			req.app.get('log').error('getting dish with id %s failed', dishId, { pgError: error });
			return res.status(500).json(error);
		});
};
