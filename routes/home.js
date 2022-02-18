var express = require('express');
var router = express.Router();
const homePageController = require('../Controllers/home');


/* GET home page. */
router.get('/', homePageController.getHome);
router.post('/', (req, res) => { res.redirect('/'); });

router.get('/logout', (req, res) => { res.redirect('/'); });
router.post('/logout', homePageController.postLogout);

module.exports = router;

