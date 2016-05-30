'use strict';

const dbHelpers = require('../../common/databaseHelpers.js');
const validator = require('../../common/validator.js');
const passwords = require('../../common/passwords.js');

module.exports.addUser = function(req, res) {
	const hashedPassword = passwords.hashPassword(req.body.password);
	const passwordData = [
		{ field: 'username', input: req.body.username, rules: { notEmpty: true, type: 'string' } },
		{ field: 'password', input: hashedPassword, rules: { notEmpty: true, type: 'string' } },
		{ field: 'role', input: req.body.role, rules: { notEmpty: true, type: 'string' } },
		{ field: 'email', input: req.body.email, rules: { notEmpty: true, type: 'string' } }
	];
	const validationResult = validator.validate(passwordData);

	if (validationResult.status === true) {
		const dbData = dbHelpers.getInsertQueryData(passwordData);
		req.app.get('db').action.addRecord({ table: 'users' }, dbData, function() {
			return res.json({ id: this.lastID });
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
