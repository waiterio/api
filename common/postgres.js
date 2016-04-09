const Promises = require('bluebird');
const Postgres = require('pg-promise');
const Settings = require('../settings.js');

var repository = require('./repository.js');

module.exports.getConnection = function () {
	var options = {
		promiseLib: Promises,
		extend: function(db) {
			this.action = repository.getRepo(db)
		}
	}

	var pgPromise = Postgres(options);

    if(typeof process.env.DATABASE_URL !== 'undefined') {
        return pgPromise(process.env.DATABASE_URL.toString() + '?ssl=true');
    }

	return pgPromise(Settings.database);
};
