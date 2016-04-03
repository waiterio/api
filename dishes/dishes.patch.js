const Postgres = require('../database/postgres.js');

//TODO: do this

exports.updateDish = function (req, res) {
    var dishesId = req.params.id;

    var requestData = {
        "name": req.body.name,
        "price": req.body.price,
        "description": req.body.description,
        "image": req.body.image,
        "categories_id": req.body.categories_id
    };

    var setQueryPart = [];
    var valueQueryPart = [];

    if(typeof requestData["name"] !== 'undefined') {
        setQueryPart.push('name');
        valueQueryPart.push('$1');
    }

    Postgres.getConnection(function (error, client, done) {
        if (error) {
            done();
            console.error(error);
            return res.status(500).json({success: false, message: error});
        }

        var dishData = [name, price, description, image, categories_id, dishesId];
        var queryString = 'UPDATE dishes SET (name, price, description, image, categories_id) ' +
                          '= ($1, $2, $3, $4, $5) WHERE id = $6';

        var query = client.query(queryString, dishData);

        query.on('row', function (row) {
            done();
            return res.json({
                "id": row.id,
                "name": name,
                "price": price,
                "description": description,
                "image": image,
                "categories_id": categories_id
            });
        });
    });
};
