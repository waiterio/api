const Postgres = require('../common/postgres.js').getConnection();
const Crypt = require('bcrypt');
const Settings = require('../settings.js');

module.exports.addUser = function(req, res) {
	var userName = req.body.user;
	var salt = Crypt.genSaltSync(Settings.saltRounds);

	console.log(Settings.saltRounds);
	console.log(userName);

	var passwordHash = Crypt.hashSync(req.body.password, salt);

	if(userName && passwordHash) {
	Postgres.query('INSERT INTO users (username, password) SELECT $1, $2 WHERE  NOT EXISTS (SELECT username FROM users WHERE username = $1) RETURNING id', [ userName, passwordHash ])
		.then(function(returningId) {
			return res.status(200).json(returningId);
		})
		.catch(function(error) {
			return res.status(500).json(error);
		});
	} else {
		return res.status(411).end();
	}
};
