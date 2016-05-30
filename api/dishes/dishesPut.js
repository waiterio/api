'use strict';

const dbHelpers = require('../../common/databaseHelpers.js');
const validator = require('../../common/validator.js');

module.exports.replaceDish = function(req, res) {
	const dishId = parseInt(req.params.id, 10);
	const dishData = [
		{ field: 'name', input: req.body.name, rules: { notEmpty: false, type: 'string' } },
		{ field: 'price', input: req.body.price, rules: { notEmpty: false, type: 'number' } },
		{ field: 'description', input: req.body.description, rules: { notEmpty: false, type: 'string' } },
		{ field: 'image', input: req.body.image, rules: { notEmpty: false, type: 'string' } },
		{ field: 'categories_id', input: req.body.categories_id, rules: { notEmpty: false, type: 'number' } }
	];
	const validationResult = validator.validate(dishData);

	if (validationResult.status === true) {
		req.app.get('db').action.updateRecord({ table: 'dishes' }, dbHelpers.getUpdateQueryData(dishData), dishId, function() {
			return res.json({ status: 200, message: 'success' });
		});
	} else {
		return res.status(validationResult.statusCode).json({ status: validationResult.statusCode, message: validationResult.message });
	}
};
