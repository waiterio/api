const Postgres = require('../common/postgres.js').getConnection();

module.exports.removeCategory = function(req, res) {
	var categoryId = parseInt(req.params.id);

	if(categoryId !== 'NaN') {
		Postgres.query('DELETE FROM categories WHERE id = $1', categoryId)
			.then(function() {
				return res.status(200).end();
			})
			.catch(function(error) {
				return res.status(500).json(error);
			});
	} else {
		return res.status(411).end();
	}
};
