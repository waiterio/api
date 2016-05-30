'use strict';

const express = require('express');
const router = express.Router();
const authentication = require('./authenticate');

// POST Requests
router.post('/token', function(req, res) {
	authentication.getToken(req, res);
});

router.post('/refresh', function(req, res) {
	res.status(501).json({ status: 501, message: 'Not implemented' });
});

router.post('/revoke', function(req, res) {
	res.status(200).json({ status: 200, message: 'Success' });
});

module.exports = router;
