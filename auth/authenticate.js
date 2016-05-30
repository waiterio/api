'use strict';

const jsonWebToken = require('jwt-simple');
const settings = require('../settings.js');
const passwords = require('../common/passwords.js');


/**
 * @param userObject
 * @returns {{access_token: String, expires: *, user: *}}
 */
function generateToken(userObject) {
	const date = new Date();
	const expires = date.setDate(date.getDate() + settings.expireDays);
	const token = jsonWebToken.encode({ expires: expires, username: userObject.username, role: userObject.role }, settings.secret);

	return {
		access_token: token,
		expires: expires,
		user: userObject
	};
}

/**
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.getToken = function(req, res) {
	const username = req.body.username;
	const password = req.body.password;

	if (typeof username === 'undefined' || typeof password === 'undefined') {
		return res.status(401).json({ status: 401, message: 'Unauth­orized' });
	}

	req.app.get('db').db.get('SELECT * FROM users WHERE username = ?', [ username ], function(error, userObject) {
		if (typeof userObject !== 'undefined' && passwords.comparePassword(password, userObject.password)) {
			return res.json(generateToken(userObject));
		}

		return res.status(401).json({ status: 401, message: 'Unauth­orized' });
	});
};
