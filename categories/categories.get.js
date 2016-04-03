const Postgres = require('../common/postgres.js').getConnection();
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getCategories = function(req, res) {
	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);

	Postgres.query('SELECT * FROM categories' + orderBy)
		.then(function(data) {
			return res.json(data);
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};

module.exports.getCategory = function(req, res) {
	var categoryId = parseInt(req.params.id);

	Postgres.oneOrNone('SELECT * FROM categories WHERE id = $1', [ categoryId ])
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