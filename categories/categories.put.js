module.exports.updateCategory = function(req, res) {
	var name = req.body.name;

	if(typeof name !== 'undefined' && name !== '') {
		req.app.get('db').query('UPDATE categories SET name = $1', [ name ])
			.then(function() {
				return res.status(200).end();
			})
			.catch(function(error) {
				return res.status(500).json(error);
			});
	} else {
		return res.status(411).end();
	}
};
