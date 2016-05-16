'use strict';

const DBHelpers = require('../../common/databaseHelpers.js');
const Validator = require('../../common/validator.js');

module.exports.getCategories = function(req, res) {
	const orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	const limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getRecords({ table: 'categories', orderBy: orderBy, limit: limit }, function(error, data) {
		return res.json(data);
	});
};

module.exports.getCategory = function(req, res) {
	const categoryId = parseInt(req.params.id, 10);
	const categoryData = [
		{ field: 'id', input: categoryId, rules: { notEmpty: true, type: 'number' } }
	];
	const validationResult = Validator.validate(categoryData);

	if (validationResult.status === true) {
		req.app.get('db').action.getRecord({ table: 'categories' }, categoryId, function(error, data) {
			return res.json(data);
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
