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
 * @param limitNumber
 * @returns {string}
 */
module.exports.getLimitQuery = function(limitNumber) {
	return ' LIMIT ' + parseInt(limitNumber);
};
