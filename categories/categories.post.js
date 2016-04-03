module.exports.addCategory = function(req, res) {
	var name = req.body.name;

	if(typeof name !== 'undefined' && name !== '') {
		req.app.get('db').one('INSERT INTO categories (name) VALUES ($1) RETURNING id', [ name ])
			.then(function(returningId) {
				return res.status(201).json(returningId);
			})
			.catch(function(error) {
				return res.status(500).json(error);
			});
	} else {
		return res.status(411).end();
	}
};
