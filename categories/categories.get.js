const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getCategories = function(req, res) {
	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);

	req.app.get('db').any('SELECT * FROM categories' + orderBy)
		.then(function(data) {
			if(data !== null) {
				return res.json(data);
			} else {
				return res.status(204).end();
			}
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};

module.exports.getCategory = function(req, res) {
	var categoryId = parseInt(req.params.id);

	req.app.get('db').oneOrNone('SELECT * FROM categories WHERE id = $1', [ categoryId ])
		.then(function(data) {
			if(data !== null) {
				return res.json(data);
			} else {
				return res.status(204).end();
			}
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};
