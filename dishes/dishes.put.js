module.exports.replaceDish = function (req, res) {
    var dishesId = req.params.id;

	//FIXME: remove sample vars
	var name = req.body.name || 'no name';
	var price = req.body.price || 1;
	var description = req.body.description || 'none given by kitchen';
	var image = req.body.image || 'https://placehold.it/230x230.png';
	var categories_id = req.body.categories_id || 1;
	var dishData = [name, price, description, image, categories_id, dishesId];

	req.app.get('db').none('UPDATE dishes SET (name, price, description, image, categories_id) = ($1, $2, $3, $4, $5) WHERE id = $6', dishData)
        .then(function() {
			return res.status(200).end();
		})
		.catch(function(error) {
			return res.status(500).json(error);
        });
};
