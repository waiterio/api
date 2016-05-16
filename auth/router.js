'use strict';

const Express = require('express');
const Router = Express.Router();
const Authentication = require('./authenticate');

// POST Requests
Router.post('/token', function(req, res) {
	Authentication.getToken(req, res);
});

Router.post('/refresh', function(req, res) {
	res.status(501).json({ status: 501, message: 'Not implemented' });
});

Router.post('/revoke', function(req, res) {
	res.status(501).json({ status: 501, message: 'Not implemented' });
});

module.exports = Router;
