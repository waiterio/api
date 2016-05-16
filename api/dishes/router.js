'use strict';

const Express = require('express');
const router = Express.Router();

const getDishes = require('./dishesGet.js');
const postDishes = require('./dishesPost.js');
const deleteDishes = require('./dishesDelete.js');
const putDishes = require('./dishesPut.js');

// GET Requests
router.get('/', function(req, res) {
	getDishes.getDishes(req, res);
});

router.get('/:id', function(req, res) {
	getDishes.getDish(req, res);
});

// POST Requests
router.post('/', function(req, res) {
	postDishes.addDish(req, res);
});

// DELETE Requests
router.delete('/:id', function(req, res) {
	deleteDishes.deleteDish(req, res);
});

// PUT Requests
router.put('/:id', function(req, res) {
	putDishes.replaceDish(req, res);
});

module.exports = router;
