const Express = require('express');
const BodyParser = require('body-parser');
const Compression = require('compression');
const CrossOrigin = require('cors');
const Settings = require('./settings.js');
const Postgres = require('./common/postgres.js');

var app = Express();

// Setting Global DB Object
app.set('db', Postgres.getConnection());

app.use(BodyParser.json());
app.use(Compression());
app.use(CrossOrigin());

// API Routes
app.use('/api/dishes', require('./dishes/router.js'));
app.use('/api/orders', require('./orders/router.js'));
app.use('/api/users', require('./users/router.js'));
app.use('/api/categories', require('./categories/router.js'));

// Default Route
app.use('/', function(req, res){
	res.send('welcome to the waiter api! check out all the options at the endpoint /resources/. the complete repository can be found on github. https://github.com/waiterio/api/');
});

// Default Fallback Route
app.use(function(req, res) {
	res.status(404).end();
});

app.listen(process.env.PORT || Settings.port, function() {
	console.info('sharks with frickin\' laser beams attached to their heads');
});
