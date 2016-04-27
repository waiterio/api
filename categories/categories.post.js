'use strict';

const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.addCategory = function(req, res) {
	let validationResult;
	const name = req.body.name;

	const categoryData = [
		{ field: 'name', input: name, rules: { notEmpty: true, type: 'string' } }
	];

	validationResult = Validator.validate(categoryData);

	if (validationResult.status === true) {
		req.app.get('db').action.add({ table: 'categories' }, DBHelpers.getInsertQueryData(categoryData))
			.then(function(returningId) {
				return res.status(201).json(returningId);
			})
			.catch(function(error) {
				req.app.get('log').error('creating category failed', { pgError: error });
				return res.status(500).json(error);
			});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
