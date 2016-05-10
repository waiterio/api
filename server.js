'use strict';

// NPM Modules
const BodyParser = require('body-parser');
const Compression = require('compression');
const CrossOrigin = require('cors');
const Express = require('express');

// Custom Modules
const Log = require('./common/logging.js');
const RequestValidation = require('./authentication/validateRequest');
const Settings = require('./settings.js');
const Database = require('./common/sqlite.js')({ database: Settings.database, environment: Settings.environment });

const App = Express();

Database.db.run('PRAGMA journal_mode = WAL');
Database.db.run('PRAGMA synchronous = NORMAL');

// Setting Global Objects
App.set('db', Database);
App.set('log', Log);

// Middleware
App.use(BodyParser.json());
App.use(Compression({}));
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

App.listen(process.env.PORT || Settings.port, function() {
	Log.info('server started in %s environment', Settings.environment, { server: this.address() });
});

module.exports = App;
