const Postgres = require('../common/postgres.js').getConnection();
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getDishes = function(req, res) {
	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);

	Postgres.any('SELECT * FROM dishes ' + orderBy)
		.then(function(data) {
			return res.json(data);
		});
};

module.exports.getDish = function(req, res) {
	var dishId = parseInt(req.params.id);

	Postgres.one('SELECT * FROM dishes WHERE id = $1', dishId)
		.then(function(data) {
			return res.json(data);
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};
