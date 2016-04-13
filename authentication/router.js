const Express = require('express');
var router = Express.Router();

const Authentication = require('./authenticate');

// GET Requests
router.post('/', function(req, res) {
	Authentication.login(req, res);
});

module.exports = router;
