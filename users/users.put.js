'use strict';

const Passwords = require('../common/passwords.js');
const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.updateUser = function(req, res) {
	const userId = parseInt(req.params.id, 10);

	const hashedPassword = Passwords.hashPassword(req.body.password);
	const passwordData = [
		{ field: 'username', input: req.body.username, rules: { notEmpty: true, type: 'string' } },
		{ field: 'password', input: hashedPassword, rules: { notEmpty: true, type: 'string' } },
		{ field: 'role', input: req.body.role, rules: { notEmpty: true, type: 'string' } },
		{ field: 'email', input: req.body.email, rules: { notEmpty: true, type: 'string' } }
	];

	const validationResult = Validator.validate(passwordData);

	if (validationResult.status === true) {
		const dbData = DBHelpers.getUpdateData(passwordData);

		req.app.get('db').action.updateRecord({ table: 'users' }, dbData, userId, function(error) {
			if (error !== null) {
				return res.status(500).json({ status: 500, message: error })
			}

			return res.json({ status: 200, message: 'success' });
		});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
