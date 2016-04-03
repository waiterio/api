const Crypt = require('bcrypt');
const Postgres = require('../common/postgres.js').getConnection();

module.exports.signIn = function(req, res) {
	if(req.body.user != '' && req.body.password != '') {
		var userName = req.body.user;
		var password = req.body.password;

		Postgres.one('SELECT password FROM users WHERE username = $1', [ userName ])
			.then(function(result) {
				var isValid = Crypt.compareSync(password, result.password);
				if(isValid) {
					return res.status(200).end();
				} else {
					return res.status(401).end();
				}
			});
	} else {
		return res.status(400).end();
	}
};
