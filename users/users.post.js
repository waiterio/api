const Crypt = require('bcrypt');
const Settings = require('../settings.js');
const Validator = require('../common/validator.js');

module.exports.addUser = function(req, res) {
	var userName = req.body.username;
	var salt = Crypt.genSaltSync(Settings.saltRounds);

	var validationResult = Validator.validate([
		{ 'field': 'username', 'input': userName, 'rules': { 'notEmpty': true, 'type': 'string' } },
		{ 'field': 'password', 'input': req.body.password, 'rules': { 'notEmpty': true, 'type': 'string' } }
	]);

	if(validationResult.status === true) {
		var passwordHash = Crypt.hashSync(req.body.password, salt);

		req.app.get('db').oneOrNone('INSERT INTO users (username, password) SELECT $1, $2 WHERE  NOT EXISTS (SELECT username FROM users WHERE username = $1) RETURNING id', [ userName, passwordHash ])
			.then(function(returningId) {
				if(returningId != null) {
					return res.json(returningId);
				} else {
					return res.status(409).json("username already exist");
				}
			})
			.catch(function(error) {
				return res.status(500).json(error);
			});

	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
