const Jwt = require('jwt-simple');
const Crypt = require('bcrypt');
const Settings = require('../settings.js');

module.exports.login = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	if(typeof username === 'undefined' || typeof password === 'undefined') {
		return res.status(401).json({ status: 401, message: 'Invalid credentials' });
	}

	req.app.get('db').oneOrNone('SELECT * FROM users WHERE username = $1 LIMIT 1', [ username ])
		.then(function(userObject) {

			if(userObject != null && Crypt.compareSync(password, userObject.password)) {
				return res.json(generateToken(userObject));
			} else {
				return res.status(401).json({ status: 401, message: 'Invalid credentials' });
			}
		})
		.catch(function(error) {
			req.app.get('log').error('selecting user for authentication from database failed', { pgError: error });
			return res.status(500).json({ status: 500, message: 'DB Error', error: error });
		});
};


/**
 * @param userObject
 * @returns {{access_token: String, expires: *, user: *}}
 */
function generateToken(userObject) {
	var date = new Date();
	var expires = date.setDate(date.getDate() + Settings.expireDays);
	var token = Jwt.encode({ expires: expires, username: userObject.username, role: userObject.role }, Settings.secret);

	return {
		access_token: token,
		expires     : expires,
		user        : userObject
	};
}
