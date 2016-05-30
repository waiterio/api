'use strict';

const dbHelpers = require('../../common/databaseHelpers.js');
const validator = require('../../common/validator.js');

module.exports.addDish = function(req, res) {
	const dishData = [
		{ field: 'name', input: req.body.name, rules: { notEmpty: true, type: 'string' } },
		{ field: 'price', input: req.body.price, rules: { notEmpty: true, type: 'number' } },
		{ field: 'description', input: req.body.description, rules: { notEmpty: false, type: 'string' } },
		{ field: 'image', input: req.body.image, rules: { notEmpty: false, type: 'string' } },
		{ field: 'categories_id', input: req.body.categories_id, rules: { notEmpty: false, type: 'number' } }
	];
	const validationResult = validator.validate(dishData);

	if (validationResult.status === true) {
		req.app.get('db').action.addRecord({ table: 'dishes' }, dbHelpers.getInsertQueryData(dishData), function() {
			return res.json({ id: this.lastID });
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
