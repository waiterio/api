'use strict';

const DBHelpers = require('../common/databaseHelpers.js');
const Validator = require('../common/validator.js');

module.exports.getUsers = function(req, res) {
	const orderBy = DBHelpers.getOrderByQuery(req.query.sort);
	const limit = DBHelpers.getLimitQuery(req.query.limit);

	req.app.get('db').action.getRecords({ table: 'users', orderBy: orderBy, limit: limit }, function(error, data) {
		return res.json(data);
	});
};

module.exports.getUser = function(req, res) {
	const userId = parseInt(req.params.id, 10);
	const userData = [
		{ field: 'id', input: userId, rules: { notEmpty: true, type: 'number' } }
	];
	const validationResult = Validator.validate(userData);

	if (validationResult.status === true) {
		req.app.get('db').action.getRecord({ table: 'users' }, userId, function(error, data) {
			return res.json(data);
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
