'use strict';

const BCrypt = require('bcryptjs');
const Assert = require('chai').assert;

const Passwords = require('../../../common/passwords.js');

describe('password class should', function() {
	it('do nothing without a password', function() {
		Assert.equal(Passwords.hashPassword());
	});


	it('hash a password correctly', function() {
		this.slow(1000);
		let hashedPassword = Passwords.hashPassword('test');
		let comparisonResult = BCrypt.compareSync('test', hashedPassword);

		Assert.equal(comparisonResult, true);
	});

	it('compare and accept correct passwords', function() {
		this.slow(500);
		let comparisonResult = BCrypt.compareSync('test', '$2a$10$djLHFkpLZOuq/PVDwrOFXudOMJYgUzlUcq6kHJOk0N2tOIthAgMu6');

		Assert.equal(comparisonResult, true);
	});

	it('compare and reject false passwords', function() {
		this.slow(500);
		let comparisonResult = Passwords.comparePassword('testing123', '$2a$10$djLHFkpLZOuq/PVDwrOFXudOMJYgUzlUcq6kHJOk0N2tOIthAgMu6');

		Assert.equal(comparisonResult, false);
	});
});
