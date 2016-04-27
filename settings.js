'use strict';

module.exports = {
	port: 8081,
	saltRounds: 10,
	secret: 'SuperSecretWaiterIOStuff',
	expireDays: 7,
	database: {
		host: 'localhost',
		port: 5432,
		database: 'waiter',
		user: 'waiter',
		password: 'waiter',
		ssl: false
	}
};
