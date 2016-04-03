const Postgres = require('../database/postgres.js').getConnection();

module.exports.addDish = function (req, res) {
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

    var dishData = [name, price, description, image, categories_id];

    Postgres.one('INSERT INTO dishes (name, price, description, image, categories_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', dishData)
        .then(function(data) {
            return res.json({
                "id": data.id,
                "name": name,
                "price": price,
                "description": description,
                "image": image,
                "categories_id": categories_id
            });
        });
};
