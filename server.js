'use strict';

const Express = require('express');
const BodyParser = require('body-parser');
const Compression = require('compression');
const CrossOrigin = require('cors');
const Settings = require('./settings.js');
const Postgres = require('./common/postgres.js');
const Winston = require('winston');
const RequestValidation = require('./authentication/validateRequest');

const App = Express();

// Winston Configuration
const Logger = new (Winston.Logger)({
	transports: [
		new (Winston.transports.Console)(),
		new (Winston.transports.File)({ filename: 'waiter.log' })
	]
});


// Setting Global Objects
App.set('db', Postgres.db);
App.set('log', Logger);

// Middleware
App.use(BodyParser.json());
App.use(Compression());
App.use(CrossOrigin());
App.use('/api/*', RequestValidation);

// Authentication Routes
App.use('/auth', require('./authentication/router.js'));

// Resource related Routes
App.use('/api/dishes', require('./dishes/router.js'));
App.use('/api/orders', require('./orders/router.js'));
App.use('/api/users', require('./users/router.js'));
App.use('/api/categories', require('./categories/router.js'));

// Default Route
App.use(function(req, res) {
	res.status(404).json({ status: 404, message: 'Not found' });
});

App.listen(process.env.PORT || Settings.port);


module.exports = App;
