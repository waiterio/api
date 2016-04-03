const Express = require('express');
var router = Express.Router();

var getOrders = require('./orders.get.js');
var postOrders = require('./orders.post.js');


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
