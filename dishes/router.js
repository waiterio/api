const Express = require('express');
var router = Express.Router();

var getDishes = require('./dishes.get.js');
var postDishes = require('./dishes.post.js');
var deleteDishes = require('./dishes.delete.js');
var putDishes = require('./dishes.put.js');

// GET Requests
router.get('/', function (req, res) {
    getDishes.getDishes(req, res);
});

router.get('/:id', function (req, res) {
    getDishes.getDish(req, res);
});

// POST Requests
router.post('/', function (req, res) {
    postDishes.addDish(req, res);
});

// DELETE Requests
router.delete('/:id', function (req, res) {
    deleteDishes.deleteDish(req, res);
});

// PUT Requests
router.put('/:id', function (req, res) {
    putDishes.replaceDish(req, res);
});

module.exports = router;
