'use strict';

module.exports.validate = function(data) {
	if (typeof data !== 'undefined' && data.length > 0) {
		const lastError = {};

		data.forEach(function(value) {
			const currentRule = value.rules;

			// Checking for empty data
			if (currentRule.notEmpty === true) {
				if (typeof value.input === 'undefined' || value.input === null || value.input.length <= 0) {
					lastError.status = false;
					lastError.statusCode = 411;
					lastError.message = `input for ${value.field} should not be empty`;
				}
			}

			// Checking Data Type
			if (typeof currentRule.type !== 'undefined') {
				if ((typeof value.input !== 'undefined' && typeof value.input !== currentRule.type) || (currentRule.type === 'number' && currentRule.notEmpty === true && isNaN(value.input))) {
					lastError.status = false;
					lastError.statusCode = 422;
					lastError.message = `input for ${value.field} ('${value.input}') is not of type ${currentRule.type}`;
				}
			}
		});

		if (typeof lastError.status !== 'undefined') {
			return lastError;
		}

		return { status: true };
	}

	return { status: false, statusCode: 411, message: 'no information was given' };
};
