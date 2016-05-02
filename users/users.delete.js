'use strict';

const Validator = require('../common/validator.js');

module.exports.removeUser = function(req, res) {
	const userId = parseInt(req.params.id, 10);
	const userData = [
		{ field: 'id', input: userId, rules: { notEmpty: true, type: 'number' } }
	];
	const validationResult = Validator.validate(userData);

	if (validationResult.status === true) {
		req.app.get('db').action.deleteRecord({ table: 'users' }, userId, function() {
			return res.status(200).json({ status: 200, message: 'success' });
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
