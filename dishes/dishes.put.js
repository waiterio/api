const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

// NOTE: this is actually more like a patching behavior.
module.exports.replaceDish = function (req, res) {
    var dishesId = parseInt(req.params.id);

	var dishData = [
		{ 'field': 'id', 'input': req.body.name, 'rules': { 'notEmpty': false, 'type': 'string' } },
		{ 'field': 'name', 'input': req.body.name, 'rules': { 'notEmpty': false, 'type': 'string' } },
		{ 'field': 'price', 'input': req.body.price, 'rules': { 'notEmpty': false, 'type': 'number' } },
		{ 'field': 'description', 'input': req.body.description, 'rules': { 'notEmpty': false, 'type': 'string' } },
		{ 'field': 'image', 'input': req.body.image, 'rules': { 'notEmpty': false, 'type': 'string' } },
		{ 'field': 'categories_id', 'input': req.body.categories_id, 'rules': { 'notEmpty': false, 'type': 'number' } }
	];

	var validationResult = Validator.validate(dishData);

	if(validationResult.status === true) {
		var dbData = DBHelpers.getInsertQueryData(dishData);

		req.app.get('db').none('UPDATE dishes SET ' + dbData.fieldQuery + ' = ' + dbData.valueQuery + ' WHERE id = ' + dishesId, dbData.vars)
			.then(function() {
				return res.status(200).end();
			})
			.catch(function(error) {
				return res.status(500).json(error);
			});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
