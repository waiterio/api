const DBHelpers = require('./databaseHelpers.js');

module.exports.getRepo = function(db) {
	return {
		add: function(queryOptions, dbData) {
			queryOptions = DBHelpers.prepareQueryOptions(queryOptions);
			return db.none('INSERT INTO ' + queryOptions.table + ' ' + dbData.fieldQuery + ' VALUES ' + dbData.valueQuery + ' RETURNING id', dbData.vars);
		},

		update: function(queryOptions, dbData, id) {
			queryOptions = DBHelpers.prepareQueryOptions(queryOptions);
			return db.none('UPDATE ' + queryOptions.table + ' SET ' + dbData.fieldQuery + ' = ' + dbData.valueQuery + ' WHERE id = ' + id, dbData.vars);
		},

		delete: function(queryOptions, id) {
			return db.none('DELETE FROM ' + queryOptions.table + ' WHERE id = $1', id);
		},

		getAll: function(queryOptions) {
			queryOptions = DBHelpers.prepareQueryOptions(queryOptions);
			return db.any('SELECT ' + queryOptions.fields + ' FROM ' + queryOptions.table + ' ' + queryOptions.orderBy + ' ' + queryOptions.limit);
		},

		get: function(queryOptions, id) {
			queryOptions = DBHelpers.prepareQueryOptions(queryOptions);
			return db.oneOrNone('SELECT ' + queryOptions.fields + ' FROM ' + queryOptions.table + ' WHERE id = $1 ' + queryOptions.orderBy + ' ' + queryOptions.limit, id);
		}
	}
}
