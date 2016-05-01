'use strict';

module.exports.deleteDish = function(req, res) {
	const dishId = parseInt(req.params.id, 10);

	req.app.get('db').action.deleteRecord({ table: 'dishes' }, dishId, function(error) {
		if (error !== null) {
			return res.status(500).json(error);
		}

		return res.json({ status: 200, message: 'success' });
	});
};
