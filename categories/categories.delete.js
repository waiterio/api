'use strict';

module.exports.removeCategory = function(req, res) {
	const categoryId = parseInt(req.params.id, 10);

	req.app.get('db').action.deleteRecord({ table: 'categories' }, categoryId, function(error) {
		if (error !== null) {
			return res.status(500).json(error);
		}

		return res.status(200).json({ status: 200, message: 'success' });
	});
};
