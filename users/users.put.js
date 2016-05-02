'use strict';

const Passwords = require('../common/passwords.js');
const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.updateUser = function(req, res) {
	const userId = parseInt(req.params.id, 10);

	const hashedPassword = Passwords.hashPassword(req.body.password);
	const passwordData = [
		{ field: 'username', input: req.body.username, rules: { notEmpty: false, type: 'string' } },
		{ field: 'password', input: hashedPassword, rules: { notEmpty: false, type: 'string' } },
		{ field: 'role', input: req.body.role, rules: { notEmpty: false, type: 'string' } },
		{ field: 'email', input: req.body.email, rules: { notEmpty: false, type: 'string' } }
	];

	const validationResult = Validator.validate(passwordData);

	if (validationResult.status === true) {
		req.app.get('db').action.updateRecord({ table: 'users' }, DBHelpers.getUpdateQueryData(passwordData), userId, function() {
			return res.json({ status: 200, message: 'success' });
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
