'use strict';

const bCrypt = require('bcryptjs');
const settings = require('../settings.js');

/**
 * @param password
 * @returns {*}
 */
module.exports.hashPassword = function(password) {
	if (typeof password !== 'undefined') {
		const salt = bCrypt.genSaltSync(settings.saltRounds);
		return bCrypt.hashSync(password, salt);
	}
};

/**
 * @param password
 * @param hashedPassword
 * @returns {*}
 */
module.exports.comparePassword = function(password, hashedPassword) {
	if (typeof password !== 'undefined' && typeof hashedPassword !== 'undefined') {
		return bCrypt.compareSync(password, hashedPassword);
	}
};
