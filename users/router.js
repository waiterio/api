'use strict';

const Express = require('express');
const router = Express.Router();

const getUsers = require('./users.get.js');
const postUsers = require('./users.post.js');
const putUsers = require('./users.put.js');

// GET Requests
router.get('/', function(req, res) {
	getUsers.getUsers(req, res);
});

router.get('/:id', function(req, res) {
	getUsers.getUser(req, res);
});

// POST Requests
router.post('/', function(req, res) {
	postUsers.addUser(req, res);
});

// PUT Requests
router.put('/:id', function(req, res) {
	putUsers.updateUser(req, res);
});


module.exports = router;
