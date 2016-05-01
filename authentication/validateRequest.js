'use strict';

const Jwt = require('jwt-simple');
const Settings = require('../settings');

module.exports = function(req, res, next) {
	const accessToken = (req.body && req.body.access_token) || req.headers['access-token'];

	if (req.method === 'OPTIONS') {
		return next();
	}

	if (accessToken) {
		let decodedUserInfo;

		try {
			decodedUserInfo = Jwt.decode(accessToken, Settings.secret);
		} catch (ex) {
			// Thrown when access token has been tampered with
			req.app.get('log').warn('authentication token could not be decoded', { token: accessToken, exception: ex });
			return res.status(401).json({ status: 401, message: 'Invalid Token or Key' });
		}

		if (decodedUserInfo.expires <= Date.now()) {
			req.app.get('log').warn('access token has expired', { userInformation: decodedUserInfo });
			return res.status(400).json({ status: 400, message: 'Token Expired' });
		}

		// Checking for roles could be done here
		// If all goes according to plan, it is safe to continue to the next middleware
		next();
	} else {
		req.app.get('log').warn('authentication failure');
		return res.status(401).json({ status: 401, message: 'Invalid Token or Key' });
	}
};
