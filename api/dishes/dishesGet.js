'use strict';

const dbHelpers = require('../../common/databaseHelpers.js');
const validator = require('../../common/validator.js');

module.exports.getDishes = function(req, res) {
	const orderBy = dbHelpers.getOrderByQuery(req.query.sort);
	const limit = dbHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getRecords({ table: 'dishes', orderBy: orderBy, limit: limit }, function(error, data) {
		return res.json(data);
	});
};

module.exports.getDish = function(req, res) {
	const dishId = parseInt(req.params.id, 10);
	const dishData = [
		{ field: 'id', input: dishId, rules: { notEmpty: true, type: 'number' } }
	];
	const validationResult = validator.validate(dishData);

	if (validationResult.status === true) {
		req.app.get('db').action.getRecord({ table: 'dishes' }, dishId, function(error, data) {
			return res.json(data);
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
