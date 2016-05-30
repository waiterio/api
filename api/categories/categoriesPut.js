'use strict';

const dbHelpers = require('../../common/databaseHelpers.js');
const validator = require('../../common/validator.js');

module.exports.updateCategory = function(req, res) {
	const categoryId = parseInt(req.params.id, 10);
	const categoryData = [
		{ field: 'name', input: req.body.name, rules: { notEmpty: false, type: 'string' } }
	];
	const validationResult = validator.validate(categoryData);

	if (validationResult.status === true) {
		req.app.get('db').action.updateRecord({ table: 'categories' }, dbHelpers.getInsertQueryData(categoryData), categoryId, function() {
			return res.json({ status: 200, message: 'success' });
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
