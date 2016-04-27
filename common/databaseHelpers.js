/**
 * This helper function constructs the ORDER BY statement
 * Fields that are to be sorted by can be passed comma separated.
 * A - before the column that is to be sorted, indicates a descending
 * sort order, if there is no dash, ascending order will be used
 *
 * @param sortQuery
 * @returns {string}
 */
module.exports.getOrderByQuery = function(sortQuery) {
	if(typeof sortQuery !== 'undefined') {
		var orderByList = [];
		var sortables = sortQuery.toString().split(',');

		sortables.forEach(function(value) {
			var sortOrder = '';
			var sortField = '';

			var matches = value.match(/^([\-])(.*)/);
			if(matches !== null) {
				sortOrder = 'DESC';
				sortField = matches[ 2 ].trim();
			} else {
				sortOrder = 'ASC';
				sortField = value.trim();
			}

			orderByList.push(sortField + ' ' + sortOrder);
		});

		if(orderByList.length > 0) {
			return ' ORDER BY ' + orderByList.join(', ');
		}
	}

	return ' ORDER BY id ASC';
};

/**
 *
 * @param data
 * @returns {object}
 */
module.exports.getInsertQueryData = function(data) {
	var queryFields = [];
	var queryValues = [];
	var replacementVars = [];

	if(typeof data !== 'undefined') {
		var valueCounter = 1;
		data.forEach(function(value) {
			if(typeof value.input !== 'undefined') {
				queryFields.push(value.field);
				queryValues.push('$' + valueCounter);
				valueCounter++;
				replacementVars.push(value.input);
			}
		});
	}

	return { 'fieldQuery': '(' + queryFields.join() + ')', 'valueQuery': '(' + queryValues.join() + ')', 'vars': replacementVars };
};

/**
 *
 * @param limitNumber
 * @returns {string}
 */
module.exports.getLimitQuery = function(limitNumber) {
	if(typeof limitNumber !== 'undefined') {
		if(!isNaN(limitNumber)) {
			var limit = parseInt(limitNumber, 10);
			if(limit <= 0) {
				limit = 0;
			}

			return ' LIMIT ' + limit;
		}
	}

	return '';
};

/**
 *
 * @param queryOptions
 * @returns {*}
 */
module.exports.prepareQueryOptions = function(queryOptions) {
	if(typeof queryOptions.fields === 'undefined') {
		queryOptions.fields = '*';
	}

	if(typeof queryOptions.orderBy === 'undefined') {
		queryOptions.orderBy = '';
	}

	if(typeof queryOptions.limit === 'undefined') {
		queryOptions.limit = '';
	}

	if(typeof queryOptions.table === 'undefined') {
		throw new Error();
	}

	return queryOptions;
};
