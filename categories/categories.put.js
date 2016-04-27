'use strict';

const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.updateCategory = function(req, res) {
	let validationResult;

	const name = req.body.name;
	const categoryId = parseInt(req.params.id, 10);
	const categoryData = [
		{ field: 'name', input: name, rules: { notEmpty: true, type: 'string' } }
	];

	validationResult = Validator.validate(categoryData);

	if (validationResult.status === true) {
		req.app.get('db').action.update({ table: 'categories' }, DBHelpers.getInsertQueryData(categoryData), categoryId)
			.then(function() {
				return res.status(200).json({});
			})
			.catch(function(error) {
				req.app.get('log').error(`updating category with id ${categoryId} failed`, { pgError: error });
				return res.status(500).json(error);
			});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
