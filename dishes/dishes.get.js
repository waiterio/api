const Postgres = require('../database/postgres.js').getConnection();

module.exports.getDishes = function(req, res) {
	Postgres.any('SELECT * FROM dishes ORDER BY id ASC')
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
