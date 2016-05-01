'use strict';

module.exports.removeUser = function(req, res) {
	const userId = parseInt(req.params.id, 10);

	req.app.get('db').action.deleteRecord({ table: 'users' }, userId, function(error) {
		if (error !== null) {
			return res.status(500).json({ status: 500, message: error })
		}

		return res.json({ status: 200, message: 'success' });
	});
};
