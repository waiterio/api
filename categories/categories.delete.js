const Validator = require('../common/validator.js');

module.exports.removeCategory = function(req, res) {
	var categoryId = parseInt(req.params.id);

	var validationResult = Validator.validate([
		{ 'field': 'name', 'input': categoryId, 'rules': { 'notEmpty': true, 'type': 'string' } } ]);

	if(validationResult.status === true) {
		req.app.get('db').query('DELETE FROM categories WHERE id = $1', categoryId)
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
