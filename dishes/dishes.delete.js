const Validator = require('../common/validator.js');

module.exports.deleteDish = function(req, res) {
	var dishId = parseInt(req.params.id);

	var validationResult = Validator.validate([
		{ 'field': 'id', 'input': dishId, 'rules': { 'notEmpty': true, 'type': 'number' } } ]);

	if(validationResult.status === true) {
		req.app.get('db').query('DELETE FROM dishes WHERE id = $1', dishId)
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
