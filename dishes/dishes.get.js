const DBHelpers = require('../common/databaseHelpers.js');

module.exports.getDishes = function(req, res) {
	var orderBy = DBHelpers.getOrderByQuery(req.query.sort);

	req.app.get('db').query('SELECT * FROM dishes ' + orderBy)
		.then(function(data) {
			return res.json(data);
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};

module.exports.getDish = function(req, res) {
	var dishId = parseInt(req.params.id);

	req.app.get('db').oneOrNone('SELECT * FROM dishes WHERE id = $1', [ dishId ])
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
