'use strict';

// NPM Modules
const bodyParser = require('body-parser');
const express = require('express');

// Custom Modules
const log = require('./common/logging.js');
const requestValidation = require('./auth/validateRequest');
const settings = require('./settings.js');
const database = require('./common/sqlite.js')({ database: settings.database, environment: settings.environment });

const server = express();

// Setting Global Objects
server.set('db', database);
server.set('log', log);

// Middleware
if(process.env.NODE_ENV !== 'test') {
	server.use(function(req, res, next) { console.log('------------------------------------------------'); next(); });
}

server.use(bodyParser.json());
server.use('/api/*', requestValidation);
if (settings.allowCrossOrigin === true) {
	log.info('enabling cross origin resource sharing for everyone');
	server.use(require('cors')());
}

// authentication Routes
server.use('/auth', require('./auth/router.js'));

// Resource related Routes
server.use('/api/dishes', require('./api/dishes/router.js'));
server.use('/api/orders', require('./api/orders/router.js'));
server.use('/api/users', require('./api/users/router.js'));
server.use('/api/categories', require('./api/categories/router.js'));

// Default Route
server.use(function(req, res) {
	res.status(404).json({ status: 404, message: 'Not Found' });
});

server.listen(process.env.PORT || settings.port, function() {
	log.info('%s server started', settings.environment, { server: this.address(), environment: settings.environment });
});

module.exports = server;
