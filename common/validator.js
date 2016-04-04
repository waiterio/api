module.exports.validate = function(data) {

	if(typeof data !== 'undefined') {
		var firstError;

		data.forEach(function(value) {
			var currentRule = value.rules;

			// Checking for empty data
			if(currentRule.notEmpty === true) {
				if(typeof value.input === 'undefined' || value.input.length <= 0) {
					firstError = { 'status': false, 'statusCode': 411, 'message': 'input for ' + value.field + ' may not be empty' };
					return false;
				}
			}

			// Checking Data Type
			if(typeof value.input !== 'undefined' && typeof value.input !== currentRule.type) {
				firstError = {'status': false, 'statusCode': 422, 'message': 'input for ' + value.field + ' (' + value.input + ') is not of type ' +
					currentRule.type + ', but of type ' + typeof value.input };
				return false;
			}
		});

		if(typeof firstError !== 'undefined') {
			return firstError;
		}

		return { 'status': true }
	}

	return {'status': false, 'statusCode': 411, 'message': 'no information was given'};
};
