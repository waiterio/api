module.exports.addDish = function (req, res) {
	//FIXME: remove sample vars
    var name = req.body.name || 'no name';
    var price = req.body.price || 1;
    var description = req.body.description || 'none given by kitchen';
    var image = req.body.image || 'https://placehold.it/230x230.png';
    var categories_id = req.body.categories_id || 1;

    var dishData = [name, price, description, image, categories_id];

	//TODO: create a separate validation for queries like this with a return similar to the categories.post.js

	req.app.get('db').one('INSERT INTO dishes (name, price, description, image, categories_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', dishData)
		.then(function(returningId) {

			return res.json(returningId);
		})
		.catch(function(error) {
			return res.status(500).json(error);
        });
};
