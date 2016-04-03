const Promises = require('bluebird');
const Postgres = require('pg-promise')({ promiseLib: Promises });
const Settings = require('../settings.js');

module.exports.getConnection = function () {
    if(typeof process.env.DATABASE_URL !== 'undefined') {
        return Postgres(process.env.DATABASE_URL.toString() + '?ssl=true');
    }

	return Postgres(Settings.database);
};
