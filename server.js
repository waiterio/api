const Express = require('express');
const BodyParser = require('body-parser');
const Compression = require('compression');
const CrossOriginResourceSharing = require('cors');
const Settings = require('./settings.js');

var app = Express();

app.use(BodyParser.json());
app.use(Compression());
app.use(CrossOriginResourceSharing());

// API Routes
app.use('/api/dishes', require('./dishes/router.js'));
app.use('/api/orders', require('./orders/router.js'));
app.use('/api/users',  require('./users/router.js'));

// Default Route
app.use(function(req, res) {
	res.status(404).end();
});

// GET /resources could return a json of all the available endpoints

app.listen(process.env.PORT || Settings.port, function() {
	console.log('listening to connections on port ' + Settings.port);
});
