'use strict';

const Express = require('express');
const router = Express.Router();

const getUsers = require('./usersGet.js');
const postUsers = require('./usersPost.js');
const putUsers = require('./usersPut.js');
const deleteUsers = require('./usersDelete.js');

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

// DELETE Requests
router.delete('/:id', function(req, res) {
	deleteUsers.removeUser(req, res);
});

module.exports = router;
