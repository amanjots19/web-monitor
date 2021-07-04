var express = require('express');
var router = express.Router();
var controller = require('../controllers/scheduler');

router.post('/apicall',controller.monitor)
module.exports = router;
