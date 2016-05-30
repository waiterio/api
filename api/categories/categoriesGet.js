'use strict';

const dbHelpers = require('../../common/databaseHelpers.js');
const validator = require('../../common/validator.js');

module.exports.getCategories = function(req, res) {
	const orderBy = dbHelpers.getOrderByQuery(req.query.sort);
	const limit = dbHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getRecords({ table: 'categories', orderBy: orderBy, limit: limit }, function(error, data) {
		return res.json(data);
	});
};

module.exports.getCategory = function(req, res) {
	const categoryId = parseInt(req.params.id, 10);
	const categoryData = [
		{ field: 'id', input: categoryId, rules: { notEmpty: true, type: 'number' } }
	];
	const validationResult = validator.validate(categoryData);

	if (validationResult.status === true) {
		req.app.get('db').action.getRecord({ table: 'categories' }, categoryId, function(error, data) {
			return res.json(data);
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
