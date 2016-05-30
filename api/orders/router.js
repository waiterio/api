'use strict';

const express = require('express');
const router = express.Router();

const getOrders = require('./ordersGet.js');
const postOrders = require('./ordersPost.js');


// GET Requests
router.get('/', function(req, res) {
	getOrders.getOrders(req, res);
});

router.get('/:id', function(req, res) {
	getOrders.getOrder(req, res);
});

// POST Requests
router.post('/', function(req, res) {
	postOrders.addOrder(req, res);
});

module.exports = router;
