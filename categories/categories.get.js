const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getCategories = function(req, res) {
	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	var limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getAll({ table: 'categories', orderBy: orderBy, limit: limit })
		.then(function(data) {
			if(data !== null) {
				return res.json(data);
			} else {
				return res.status(204).end();
			}
		})
		.catch(function(error) {
			req.app.get('log').error('getting all categories failed', { pgError: error });
			return res.status(500).json(error);
		});
};

module.exports.getCategory = function(req, res) {
	var categoryId = parseInt(req.params.id, 10);

	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	var limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.get({ table: 'categories', orderBy: orderBy, limit: limit }, categoryId)
		.then(function(data) {
			if(data !== null) {
				return res.json(data);
			} else {
				return res.status(204).end();
			}
		})
		.catch(function(error) {
			req.app.get('log').error('getting category with id %s failed', categoryId, { pgError: error });
			return res.status(500).json(error);
		});
};
