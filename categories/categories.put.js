const Validator = require('../common/validator.js');
const DBHelpers = require('../common/databaseHelpers.js');

module.exports.updateCategory = function(req, res) {
	var name = req.body.name;
	var categoryId = parseInt(req.params.id);

	var categoryData = [
		{ 'field': 'name', 'input': name, 'rules': { 'notEmpty': true, 'type': 'string' } }
	];

	var validationResult = Validator.validate(categoryData);

	if(validationResult.status === true) {
		var dbData = DBHelpers.getInsertQueryData(categoryData);

		req.app.get('db').action.update({ table: 'categories' }, dbData, categoryId)
			.then(function() {
				return res.status(200).json({});
			})
			.catch(function(error) {
				req.app.get('log').error('updating category with id ' + categoryId + ' failed', { pgError: error });
				return res.status(500).json(error);
			});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
