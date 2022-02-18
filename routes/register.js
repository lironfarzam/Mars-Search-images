'use strict';
var express = require('express');
var router = express.Router();
const registerController = require('../Controllers/register');
const middleWare = require('../Controllers/middleWare');


router.get('/', middleWare.alreadyConnected, registerController.getRegister);
router.post('/', (req, res) => { res.redirect('/register'); });

router.get('/adduser', (req, res) => { res.redirect('/'); });
router.post('/adduser', [middleWare.checkTimerCookie, middleWare.valitadeRgester], registerController.addUserToDataBase);


router.get('/succsess', registerController.getSuccess);
router.post('/succsess', (req, res) => { res.redirect('/'); });

router.get('/fail', registerController.getFail);
router.post('/fail', (req, res) => { res.redirect('/'); });

router.get('/timeout', (req, res) => { res.redirect('/'); });
router.post('/timeout', registerController.postTimeOut);

module.exports = router;