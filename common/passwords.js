'use strict';

const BCrypt = require('bcryptjs');
const Settings = require('../settings.js');

module.exports.hashPassword = function(password) {
	if (typeof password !== 'undefined') {
		const salt = BCrypt.genSaltSync(Settings.saltRounds);
		return BCrypt.hashSync(password, salt);
	}
};

module.exports.comparePassword = function(password, hashedPassword) {
	if (typeof password !== 'undefined' && typeof hashedPassword !== 'undefined') {
		return BCrypt.compareSync(password, hashedPassword);
	}
};
