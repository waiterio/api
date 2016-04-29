'use strict';

const DBHelpers = require('./databaseHelpers.js');

module.exports.getRepo = function(db) {
	return {
		add: function(queryOptions, dbData) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			return db.one(`INSERT INTO ${preparedOptions.table} ${dbData.fieldQuery} VALUES ${dbData.valueQuery} RETURNING id`.trim(), dbData.vars);
		},

		update: function(queryOptions, dbData, id) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			return db.none(`UPDATE ${preparedOptions.table} SET ${dbData.fieldQuery} = ${dbData.valueQuery} WHERE id = ${id}`.trim(), dbData.vars);
		},

		remove: function(queryOptions, id) {
			return db.none(`DELETE FROM ${queryOptions.table} WHERE id = $1`, id);
		},

		getAll: function(queryOptions) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			return db.any(`SELECT ${preparedOptions.fields} FROM ${preparedOptions.table} ${preparedOptions.orderBy} ${preparedOptions.limit}`.trim());
		},

		getSingle: function(queryOptions, id) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			return db.oneOrNone(`SELECT ${preparedOptions.fields} FROM ${preparedOptions.table} WHERE id = $1 LIMIT 1`.trim(), id);
		}
	};
};
