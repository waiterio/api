const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.addDish = function (req, res) {
	var dishData = [
		{ 'field': 'name', 'input': req.body.name, 'rules': { 'notEmpty': true, 'type': 'string' } },
		{ 'field': 'price', 'input': req.body.price, 'rules': { 'notEmpty': true, 'type': 'number' } },
		{ 'field': 'description', 'input': req.body.description, 'rules': { 'notEmpty': false, 'type': 'string' } },
		{ 'field': 'image', 'input': req.body.image, 'rules': { 'notEmpty': false, 'type': 'string' } },
		{ 'field': 'categories_id', 'input': req.body.categories_id, 'rules': { 'notEmpty': false, 'type': 'number' } }
	];

	var validationResult = Validator.validate(dishData);

	if(validationResult.status === true) {
		var dbData = DBHelpers.getInsertQueryData(dishData);

		req.app.get('db').one('INSERT INTO dishes ' + dbData.fieldQuery + ' VALUES ' + dbData.valueQuery + ' RETURNING id', dbData.vars)
			.then(function(returningId) {
				return res.json(returningId);
			})
			.catch(function(error) {
				return res.status(500).json(error);
			});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
