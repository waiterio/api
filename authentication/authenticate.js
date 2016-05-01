'use strict';

const Jwt = require('jwt-simple');
const Settings = require('../settings.js');
const Passwords = require('../common/passwords.js');


/**
 * @param userObject
 * @returns {{access_token: String, expires: *, user: *}}
 */
function generateToken(userObject) {
	const date = new Date();
	const expires = date.setDate(date.getDate() + Settings.expireDays);
	const token = Jwt.encode({ expires: expires, username: userObject.username, role: userObject.role }, Settings.secret);

	return {
		access_token: token,
		expires: expires,
		user: userObject
	};
}


module.exports.getToken = function(req, res) {
	const username = req.body.username;
	const password = req.body.password;

	if (typeof username === 'undefined' || typeof password === 'undefined') {
		return res.status(401).json({ status: 401, message: 'Invalid credentials' });
	}

	req.app.get('db').get('SELECT * FROM users WHERE username = ?', [ username ], function(error, userObject) {
		if (error) {
			return res.status(500).json({ status: 500, message: 'DB Error', error: error });
		}

		if (userObject !== null && Passwords.comparePassword(password, userObject.password)) {
			return res.json(generateToken(userObject));
		}

		return res.status(401).json({ status: 401, message: 'Invalid credentials' });
	});
};
