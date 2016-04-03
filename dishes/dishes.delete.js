const Postgres = require('../common/postgres.js').getConnection();

module.exports.deleteDish = function(req, res) {
	var dishId = parseInt(req.params.id);

	if(dishId !== 'NaN') {
		Postgres.query('DELETE FROM dishes WHERE id = $1', dishId)
			.then(function() {
				return res.status(200).end();
			})
			.catch(function(error) {
				return res.status(500).json({ success: false, 'message': error });
			});
	}
};
