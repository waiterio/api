'use strict';

const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.addDish = function(req, res) {
	const dishData = [
		{ field: 'name', input: req.body.name, rules: { notEmpty: true, type: 'string' } },
		{ field: 'price', input: req.body.price, rules: { notEmpty: true, type: 'number' } },
		{ field: 'description', input: req.body.description, rules: { notEmpty: false, type: 'string' } },
		{ field: 'image', input: req.body.image, rules: { notEmpty: false, type: 'string' } },
		{ field: 'categories_id', input: req.body.categories_id, rules: { notEmpty: false, type: 'number' } }
	];
	const validationResult = Validator.validate(dishData);

	if (validationResult.status === true) {
		req.app.get('db').action.addRecord({ table: 'dishes' }, DBHelpers.getInsertQueryData(dishData), function(error) {
			if (error !== null) {
				return res.status(500).json(error);
			}

			return res.json({ id: this.lastID });
		});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
