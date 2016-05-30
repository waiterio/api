'use strict';

const dbHelpers = require('../../common/databaseHelpers.js');
const validator = require('../../common/validator.js');

module.exports.addCategory = function(req, res) {
	const categoryData = [
		{ field: 'name', input: req.body.name, rules: { notEmpty: true, type: 'string' } }
	];
	const validationResult = validator.validate(categoryData);

	if (validationResult.status === true) {
		req.app.get('db').action.addRecord({ table: 'categories' }, dbHelpers.getInsertQueryData(categoryData), function() {
			return res.json({ id: this.lastID });
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
