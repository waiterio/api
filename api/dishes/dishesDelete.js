'use strict';

const validator = require('../../common/validator.js');

module.exports.deleteDish = function(req, res) {
	const dishId = parseInt(req.params.id, 10);
	const dishData = [
		{ field: 'id', input: dishId, rules: { notEmpty: true, type: 'number' } }
	];
	const validationResult = validator.validate(dishData);

	if (validationResult.status === true) {
		req.app.get('db').action.deleteRecord({ table: 'dishes' }, dishId, function() {
			return res.status(200).json({ status: 200, message: 'success' });
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
