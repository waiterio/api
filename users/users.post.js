'use strict';

const Passwords = require('../common/passwords.js');
const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.addUser = function(req, res) {
	const hashedPassword = Passwords.hashPassword(req.body.password);

	const passwordData = [
		{ field: 'username', input: req.body.username, rules: { notEmpty: true, type: 'string' } },
		{ field: 'password', input: hashedPassword, rules: { notEmpty: true, type: 'string' } },
		{ field: 'role', input: req.body.role, rules: { notEmpty: true, type: 'string' } },
		{ field: 'email', input: req.body.email, rules: { notEmpty: true, type: 'string' } }
	];

	const validationResult = Validator.validate(passwordData);

	if (validationResult.status === true) {
		const dbData = DBHelpers.getInsertQueryData(passwordData);

		req.app.get('db').action.add({ table: 'users' }, dbData)
			.then(function(returningId) {
				return res.json(returningId);
			})
			.catch(function(error) {
				req.app.get('log').error('creating user failed', { pgError: error });
				return res.status(500).json(error);
			});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
