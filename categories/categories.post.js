const Validator = require('../common/validator.js');

module.exports.addCategory = function(req, res) {
	var name = req.body.name;

	var validationResult = Validator.validate([
		{ 'field': 'name', 'input': name, 'rules': { 'notEmpty': true, 'type': 'string' } }
	]);

	if(validationResult.status === true) {
		req.app.get('db').one('INSERT INTO categories (name) VALUES ($1) RETURNING id', [ name ])
			.then(function(returningId) {
				return res.status(201).json(returningId);
			})
			.catch(function(error) {
				return res.status(500).json(error);
			});
	} else {
		return res.status(validationResult.statusCode).json(validationResult.message);
	}
};
