const Crypt = require('bcrypt');
const Settings = require('../settings.js');
const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.updateUser = function(req, res) {
	var salt = Crypt.genSaltSync(Settings.saltRounds);
	var userId = parseInt(req.params.id);

	var passwordData = [
		{ 'field': 'username', 'input': req.body.username, 'rules': { 'notEmpty': true, 'type': 'string' } },
		{ 'field': 'password', 'input': Crypt.hashSync(req.body.password, salt), 'rules': { 'notEmpty': true, 'type': 'string' } },
		{ 'field': 'role', 'input': req.body.role, 'rules': { 'notEmpty': true, 'type': 'string' } },
		{ 'field': 'email', 'input': req.body.email, 'rules': { 'notEmpty': true, 'type': 'string' } }
	];

	var validationResult = Validator.validate(passwordData);

	if(validationResult.status === true) {
		var dbData = DBHelpers.getInsertQueryData(passwordData);

		req.app.get('db').action.update({ table: 'users' }, dbData, userId)
			.then(function(returningId) {
				return res.json(returningId);
			})
			.catch(function(error) {
				req.app.get('log').error('updating user with id ' + userId + ' failed', { pgError: error });
				return res.status(500).json(error);
			});

	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}

};


// INSERT INTO users (username, password) SELECT $1, $2 WHERE  NOT EXISTS (SELECT username FROM users WHERE username = $1) RETURNING id', [ userName, passwordHash ])
//if(returningId != null) {
//	return res.json(returningId);
//} else {
//	return res.status(409).json("username already exist");
//}
