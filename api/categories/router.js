'use strict';

const express = require('express');
const router = express.Router();

const getCategories = require('./categoriesGet.js');
const postCategories = require('./categoriesPost.js');
const deleteCategories = require('./categoriesDelete.js');
const putCategories = require('./categoriesPut.js');

// GET Requests
router.get('/', function(req, res) {
	getCategories.getCategories(req, res);
});

router.get('/:id', function(req, res) {
	getCategories.getCategory(req, res);
});

// POST Requests
router.post('/', function(req, res) {
	postCategories.addCategory(req, res);
});

// DELETE Requests
router.delete('/:id', function(req, res) {
	deleteCategories.removeCategory(req, res);
});

// PUT Requests
router.put('/:id', function(req, res) {
	putCategories.updateCategory(req, res);
});


module.exports = router;
