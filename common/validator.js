'use strict';

module.exports.validate = function(data) {
	let lastError;

	if (typeof data !== 'undefined') {
		data.forEach(function(value) {
			const currentRule = value.rules;

			// Checking for empty data
			if (currentRule.notEmpty === true) {
				if (typeof value.input === 'undefined' || value.input.length <= 0) {
					lastError.status = false;
					lastError.statusCode = 411;
					lastError.message = `input for ${value.field} should not be empty`;
					return false;
				}
			}

			// Checking Data Type
			if (typeof value.input !== 'undefined' && typeof value.input !== currentRule.type) {
				lastError.status = false;
				lastError.statusCode = 422;
				lastError.message = `input for ${value.field} ('${value.input}') is not of type ${currentRule.type}`;
				return false;
			}
		});

		if (typeof lastError !== 'undefined') {
			return lastError;
		}

		return { status: true };
	}

	return { status: false, statusCode: 411, message: 'no information was given' };
};
