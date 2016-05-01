'use strict';

const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.updateCategory = function(req, res) {
	const categoryId = parseInt(req.params.id, 10);
	const categoryData = [
		{ field: 'name', input: req.body.name, rules: { notEmpty: true, type: 'string' } }
	];
	const validationResult = Validator.validate(categoryData);

	if (validationResult.status === true) {
		req.app.get('db').action.updateRecord({ table: 'categories' }, DBHelpers.getInsertQueryData(categoryData), categoryId, function(error) {
			if (error !== null) {
				return res.status(500).json(error);
			}

			return res.json({ status: 200, message: 'success' });
		});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
