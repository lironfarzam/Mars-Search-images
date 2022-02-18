var express = require('express');
var router = express.Router();
const apiController = require('../Controllers/api');
const middleWare = require('../Controllers/middleWare');


router.post('/is-valid-email', apiController.isValidEmail);
router.post('/verify-user', apiController.verifyUser);

//private api - can ask for api with TOKEN only! 
router.put('/add-image',middleWare.checkAccess, apiController.addImage);
router.get('/saved-image-list',middleWare.checkAccess, apiController.geSavedImageList);
router.delete('/delete-image',middleWare.checkAccess , apiController.deleteImage);
router.delete('/delete-all-image-list',middleWare.checkAccess, apiController.deleteAllImages);

module.exports = router;