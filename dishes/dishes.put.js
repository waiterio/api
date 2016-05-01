'use strict';

const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.replaceDish = function(req, res) {
	const dishesId = parseInt(req.params.id, 10);
	const dishData = [
		{ field: 'name', input: req.body.name, rules: { notEmpty: false, type: 'string' } },
		{ field: 'price', input: req.body.price, rules: { notEmpty: false, type: 'number' } },
		{ field: 'description', input: req.body.description, rules: { notEmpty: false, type: 'string' } },
		{ field: 'image', input: req.body.image, rules: { notEmpty: false, type: 'string' } },
		{ field: 'categories_id', input: req.body.categories_id, rules: { notEmpty: false, type: 'number' } }
	];
	const validationResult = Validator.validate(dishData);

	if (validationResult.status === true) {
		req.app.get('db').action.updateRecord({ table: 'dishes' }, DBHelpers.getInsertQueryData(dishData), dishesId, function(error) {
			if (error !== null) {
				return res.status(500).json(error);
			}

			return res.json({ status: 200, message: 'success' });
		});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
