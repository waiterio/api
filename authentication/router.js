const Express = require('express');
var router = Express.Router();

const Authentication = require('./authenticate');

// POST Requests
router.post('/token', function(req, res) {
	Authentication.getToken(req, res);
});

router.post('/refresh', function(req, res) {
	res.status(501).json({ status: 501, message: 'Not implemented' })
});

router.post('/revoke', function(req, res) {
	res.status(501).json({ status: 501, message: 'Not implemented' })
});

module.exports = router;
