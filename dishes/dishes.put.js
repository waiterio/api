const Postgres = require('../database/postgres.js').getConnection();

module.exports.replaceDish = function (req, res) {
    var dishesId = req.params.id;

    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    var image = req.body.image;
    var categories_id = req.body.categories_id;

    if (typeof name !== 'string') {
        return res.status(422).json({success: false, message: 'invalid_field_name'});
    }

    if (typeof price !== 'number') {
        return res.status(422).json({success: false, message: 'invalid_field_price'});
    }

    if (typeof description !== 'string') {
        return res.status(422).json({success: false, message: 'invalid_field_description'});
    }

    if (typeof categories_id !== 'number') {
        return res.status(422).json({success: false, message: 'invalid_field_categories_id'});
    }

    var dishData = [name, price, description, image, categories_id, dishesId];

    Postgres.none('UPDATE dishes SET (name, price, description, image, categories_id) = ($1, $2, $3, $4, $5) WHERE id = $6', dishData)
        .then(function() {
            return res.json([{
                "id": dishesId,
                "name": name,
                "price": price,
                "description": description,
                "image": image,
                "categories_id": categories_id
            }]);
        });
};
