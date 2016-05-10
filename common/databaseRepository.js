'use strict';

const DBHelpers = require('./databaseHelpers.js');
const Log = require('./logging.js');

module.exports.getRepo = function(db) {
	return {
		addRecord: function(queryOptions, dbData, callback) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			const dbQuery = `INSERT INTO ${preparedOptions.table} ${dbData.fieldQuery} VALUES ${dbData.valueQuery}`.trim();
			Log.data('insert data into %s', preparedOptions.table, { query: dbQuery, variables: dbData.vars });

			db.run(dbQuery, dbData.vars, callback);
		},

		updateRecord: function(queryOptions, dbData, id, callback) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			const dbQuery = `UPDATE ${preparedOptions.table} SET ${dbData.updateQuery} WHERE id = ${id}`.trim();
			Log.data('update record %s from %s', id, preparedOptions.table, { query: dbQuery, variables: dbData.vars });

			db.run(dbQuery, dbData.vars, callback);
		},

		deleteRecord: function(queryOptions, id, callback) {
			const dbQuery = `DELETE FROM ${queryOptions.table} WHERE id = ?`.trim();
			Log.data('deleting record %s from %s', id, queryOptions.table, { query: dbQuery });

			db.run(dbQuery, id, callback);
		},

		getRecords: function(queryOptions, callback) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			const dbQuery = `SELECT ${preparedOptions.fields} FROM ${preparedOptions.table} ${preparedOptions.orderBy} ${preparedOptions.limit}`.trim();
			Log.data('select all records from %s', preparedOptions.table, { query: dbQuery });

			db.all(dbQuery, callback);
		},

		getRecord: function(queryOptions, id, callback) {
			const preparedOptions = DBHelpers.prepareQueryOptions(queryOptions);
			const dbQuery = `SELECT ${preparedOptions.fields} FROM ${preparedOptions.table} WHERE id = ${id}`.trim();
			Log.data('select record %s from %s', id, preparedOptions.table, { query: dbQuery });

			db.get(dbQuery, callback);
		}
	};
};
