
module.exports.removeCategory = function(req, res) {
	var categoryId = parseInt(req.params.id);

	req.app.get('db').action.delete({ table: 'categories' }, categoryId)
		.then(function() {
			return res.status(200).json({});
		})
		.catch(function(error) {
			req.app.get('log').error('deleting category with id %s failed', categoryId, { pgError: error });
			return res.status(500).json(error);
		});
};
