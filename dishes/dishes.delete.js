'use strict';

module.exports.deleteDish = function(req, res) {
	const dishId = parseInt(req.params.id, 10);

	req.app.get('db').action.remove({ table: 'dishes' }, dishId)
		.then(function() {
			return res.status(200).json({});
		})
		.catch(function(error) {
			req.app.get('log').error(`deleting dish with id ${dishId} failed`, { pgError: error });
			return res.status(500).json(error);
		});
};
