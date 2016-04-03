const Postgres = require('../database/postgres.js').getConnection();

module.exports.addCategory = function(req, res) {
	var name = req.body.name;

	Postgres.query('INSERT INTO categories (name) $1', [ name ])
		.then(function() {
			return res.status(200).end();
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
};
