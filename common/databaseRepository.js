'use strict';

const DBHelpers = require('./databaseHelpers.js');
const Log = require('./logging.js');

module.exports.getRepo = function(db) {
	return {
		addRecord: function(queryOptions, dbData, callback) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			db.run(`INSERT INTO ${preparedOptions.table} ${dbData.fieldQuery} VALUES ${dbData.valueQuery}`.trim(), dbData.vars, callback);
		},

		updateRecord: function(queryOptions, dbData, id, callback) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			db.run(`UPDATE ${preparedOptions.table} SET ${dbData.updateQuery} WHERE id = ${id}`.trim(), dbData.vars, callback);
		},

		deleteRecord: function(queryOptions, id, callback) {
			db.run(`DELETE FROM ${queryOptions.table} WHERE id = ?`.trim(), id, callback)
		},

		getRecords: function(queryOptions, callback) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			db.all(`SELECT ${preparedOptions.fields} FROM ${preparedOptions.table} ${preparedOptions.orderBy} ${preparedOptions.limit}`.trim(), callback);
		},

		getRecord: function(queryOptions, id, callback) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			db.get(`SELECT ${preparedOptions.fields} FROM ${preparedOptions.table} WHERE id = ${id}`.trim(), callback);
		}
	};
};
