const Jwt = require('jwt-simple');
const Settings = require('../settings');

module.exports = function(req, res, next) {
	if(req.method == 'OPTIONS') {
		return next();
	}

	var accessToken = (req.body && req.body.access_token) || req.headers[ 'access-token' ];

	if(accessToken) {
		try {
			var decodedUserInfo = Jwt.decode(accessToken, Settings.secret);
		} catch(ex) {
			// Thrown when access token has been tampered with
			return res.status(401).json({ status: 401, message: 'Invalid Token or Key' })
		}

		if(decodedUserInfo.expires <= Date.now()) {
			return res.status(400).json({ status: 400, message: 'Token Expired' });
		} else {
			// Checking for roles could be done here
			// If all goes according to plan, it is safe to continue to the next middleware
			next();
		}

	} else {
		return res.status(401).json({ status: 401, message: 'Invalid Token or Key' });
	}
};
