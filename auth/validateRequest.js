'use strict';

const jsonWebToken = require('jwt-simple');
const settings = require('../settings');

module.exports = function(req, res, next) {
	req.app.get('log').route(`${req.method} ${req.originalUrl}`);

	const accessToken = (req.body && req.body.access_token) || req.headers[ 'access-token' ];

	if (req.method === 'OPTIONS' || process.env.NODE_ENV === 'test') {
		return next();
	}

	if (accessToken) {
		let decodedUserInfo;

		try {
			decodedUserInfo = jsonWebToken.decode(accessToken, settings.secret, false);
		} catch(ex) {
			// Thrown when access token has been tampered with
			req.app.get('log').warn('authentication token could not be decoded', { token: accessToken });
			return res.status(401).json({ status: 401, message: 'Unauth­orized' });
		}

		if (decodedUserInfo.expires <= Date.now()) {
			req.app.get('log').info('access token has expired', { userInformation: decodedUserInfo });
			return res.status(400).json({ status: 400, message: 'Unauth­orized' });
		}

		// Checking for roles could be done here
		// If all goes according to plan, it is safe to continue to the next middleware
		next();
	} else {
		req.app.get('log').warn('general authentication failure');
		return res.status(401).json({ status: 401, message: 'Unauth­orized' });
	}
};
