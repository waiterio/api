const Crypt = require('bcrypt');
const Settings = require('../settings.js');
const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.addUser = function(req, res) {
	var salt = Crypt.genSaltSync(Settings.saltRounds);

	if(req.body.password !== 'undefined') {
		var passwordData = [
			{ 'field': 'username', 'input': req.body.username, 'rules': { 'notEmpty': true, 'type': 'string' } },
			{ 'field': 'password', 'input': Crypt.hashSync(req.body.password, salt), 'rules': { 'notEmpty': true, 'type': 'string' } }
		];

		var validationResult = Validator.validate(passwordData);

		if(validationResult.status === true) {
			var dbData = DBHelpers.getInsertQueryData(passwordData);

			req.app.get('db').action.add({table: 'users'}, dbData)
				.then(function(returningId) {
					return res.json(returningId);
				})
				.catch(function(error) {
					return res.status(500).json(error);
				});

		} else {
			req.app.get('log').error('creating user failed', { pgError: error });
			return res.status(validationResult.statusCode).json(validationResult.message);
		}
	}

	return res.status(411).end();
};


// INSERT INTO users (username, password) SELECT $1, $2 WHERE  NOT EXISTS (SELECT username FROM users WHERE username = $1) RETURNING id', [ userName, passwordHash ])
//if(returningId != null) {
//	return res.json(returningId);
//} else {
//	return res.status(409).json("username already exist");
//}
