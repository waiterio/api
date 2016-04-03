const Express = require('express');
var router = Express.Router();

var getUsers = require('./users.get.js');
var postUsers = require('./users.post.js');

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

module.exports = router;
