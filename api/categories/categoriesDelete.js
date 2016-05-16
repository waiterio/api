'use strict';

const Validator = require('../../common/validator.js');

module.exports.removeCategory = function(req, res) {
	const categoryId = parseInt(req.params.id, 10);
	const categoryData = [
		{ field: 'id', input: categoryId, rules: { notEmpty: true, type: 'number' } }
	];
	const validationResult = Validator.validate(categoryData);

	if (validationResult.status === true) {
		req.app.get('db').action.deleteRecord({ table: 'categories' }, categoryId, function() {
			return res.status(200).json({ status: 200, message: 'success' });
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
