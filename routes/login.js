'use strict';
var express = require('express');
var router = express.Router();
const loginController = require('../Controllers/login');
const middleWare = require('../Controllers/middleWare');

router.get('/', middleWare.alreadyConnected, loginController.getLogin);
router.post('/', loginController.postLogin);

module.exports = router;