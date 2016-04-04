const Validator = require('../common/validator.js');

module.exports.updateCategory = function(req, res) {
	var name = req.body.name;

	var validationResult = Validator.validate([
		{ 'field': 'name', 'input': name, 'rules': { 'notEmpty': true, 'type': 'string' } }
	]);

	if(validationResult.status === true) {
		req.app.get('db').query('UPDATE categories SET name = $1', [ name ])
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
