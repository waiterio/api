const Postgres = require('../database/postgres.js').getConnection();
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getUsers = function(req, res) {
	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);

	Postgres.query('SELECT id, username FROM users' + orderBy)
		.then(function(data) {
			return res.json(data);
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};

module.exports.getUser = function(req, res) {
	var userId = parseInt(req.params.id);

	Postgres.oneOrNone('SELECT id, username FROM users WHERE id = $1', [ userId ])
		.then(function(data) {
			return res.json(data);
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};
