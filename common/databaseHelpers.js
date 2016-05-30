'use strict';

/**
 * This helper function constructs the ORDER BY statement
 * Fields that are to be sorted by can be passed comma separated.
 * A - before the column that is to be sorted, indicates a descending
 * sort order, if there is no dash, ascending order will be used.
 *
 * sortQuery example: -username,id,-email
 *           result: username DESC, id ASC, email DESC
 *
 * @param sortQuery
 * @returns {string}
 */
module.exports.getOrderByQuery = function(sortQuery) {
	if (typeof sortQuery !== 'undefined') {
		const orderByList = [];
		const sortables = sortQuery.toString().split(',');

		sortables.forEach(function(value) {
			let sortOrder = '';
			let sortField = '';

			const matches = value.match(/^([\-])(.*)/);
			if (matches !== null) {
				sortOrder = 'DESC';
				sortField = matches[2].trim();
			} else {
				sortOrder = 'ASC';
				sortField = value.trim();
			}

			orderByList.push(`${sortField} ${sortOrder}`);
		});

		if (orderByList.length > 0) {
			return ` ORDER BY ${orderByList.join(', ')}`;
		}
	}

	return ' ORDER BY id ASC';
};

/**
 * This function returns an object containing information that
 * may be used to build an insert query.
 *
 * Sample data:
 * const passwordData = [
	 { field: 'username', input: req.body.username, rules: { notEmpty: true, type: 'string' } },
	 { field: 'password', input: hashedPassword, rules: { notEmpty: true, type: 'string' } },
	 { field: 'role', input: req.body.role, rules: { notEmpty: true, type: 'string' } },
	 { field: 'email', input: req.body.email, rules: { notEmpty: true, type: 'string' } } ];
 *
 * @param data
 * @returns {object}
 */
module.exports.getInsertQueryData = function(data) {
	const queryFields = [];
	const queryValues = [];
	const replacementVars = [];

	if (typeof data !== 'undefined') {
		let valueCounter = 1;

		data.forEach(function(value) {
			if (typeof value.input !== 'undefined') {
				queryFields.push(value.field);
				queryValues.push('?');
				replacementVars.push(value.input);

				valueCounter++;
			}
		});
	}

	return { fields: queryFields, values: queryValues, fieldQuery: `(${queryFields.join()})`, valueQuery: `(${queryValues.join()})`, vars: replacementVars };
};

/**
 * @param data
 * @returns {{updateQuery: string, vars: Array}}
 */
module.exports.getUpdateQueryData = function(data) {
	const queryParts = [];
	const replacementVars = [];

	if (typeof data !== 'undefined') {
		data.forEach(function(value) {
			if (typeof value.input !== 'undefined') {
				queryParts.push(`${value.field}=?`);
				replacementVars.push(value.input);
			}
		});
	}

	return { updateQuery: `${queryParts.join()}`, vars: replacementVars };
};

/**
 * @param limitNumber
 * @returns {string}
 */
module.exports.getLimitQuery = function(limitNumber) {
	if (typeof limitNumber !== 'undefined') {
		if (!isNaN(limitNumber)) {
			let limit = parseInt(limitNumber, 10);

			if (limit <= 0) {
				limit = 0;
			}

			return ` LIMIT ${limit}`;
		}
	}

	return '';
};

/**
 * @param queryOptions
 * @returns {*}
 */
module.exports.prepareQueryOptions = function(queryOptions) {
	const preparedQueryOptions = queryOptions;

	if (typeof preparedQueryOptions !== 'undefined' && preparedQueryOptions !== null) {
		if (typeof queryOptions.fields === 'undefined') {
			preparedQueryOptions.fields = '*';
		}

		if (typeof queryOptions.orderBy === 'undefined') {
			preparedQueryOptions.orderBy = '';
		}

		if (typeof queryOptions.limit === 'undefined') {
			preparedQueryOptions.limit = '';
		}

		if (typeof queryOptions.table === 'undefined') {
			throw new Error('table cannot be undefined');
		}
	}

	return preparedQueryOptions;
};
