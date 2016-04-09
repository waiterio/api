const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.addCategory = function(req, res) {
	var name = req.body.name;

	var categoryData = [
		{ 'field': 'name', 'input': name, 'rules': { 'notEmpty': true, 'type': 'string' } }
	];

	var validationResult = Validator.validate(categoryData);

	if(validationResult.status === true) {
		var dbData = DBHelpers.getInsertQueryData(categoryData);

		req.app.get('db').action.add({ table: 'categories' }, dbData)
			.then(function(returningId) {
				return res.status(201).json(returningId);
			})
			.catch(function(error) {
				req.app.get('log').error('creating category failed', { pgError: error });
				return res.status(500).json(error);
			});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
