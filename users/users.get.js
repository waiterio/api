const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getUsers = function(req, res) {
	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);

	req.app.get('db').any('SELECT id, username FROM users' + orderBy)
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

module.exports.getUser = function(req, res) {
	var userId = parseInt(req.params.id);

	req.app.get('db').oneOrNone('SELECT id, username FROM users WHERE id = $1', [ userId ])
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
