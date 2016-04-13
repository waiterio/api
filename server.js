const Express = require('express');
const BodyParser = require('body-parser');
const Compression = require('compression');
const CrossOrigin = require('cors');
const Settings = require('./settings.js');
const Postgres = require('./common/postgres.js');
const Winston = require('winston');

var app = Express();

// Winston Configuration
const Logger = new (Winston.Logger)({
	transports: [
		new (Winston.transports.Console)(),
		new (Winston.transports.File)({ filename: 'waiter.log' })
	]
});


// Setting Global Objects
app.set('db', Postgres.db);
app.set('log', Logger);

app.use(BodyParser.json());
app.use(Compression());
app.use(CrossOrigin());

// API Routes
app.use('/api/dishes', require('./dishes/router.js'));
app.use('/api/orders', require('./orders/router.js'));
app.use('/api/users', require('./users/router.js'));
app.use('/api/categories', require('./categories/router.js'));


// Default Route
app.use(function(req, res) {
	res.status(404).end();
});

app.listen(process.env.PORT || Settings.port, function() {
	console.info('sharks with frickin\' laser beams attached to their heads');
});


module.exports = app;
