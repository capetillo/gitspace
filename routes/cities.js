var express = require('express');
var router = express.Router();
var citiesCtrl = require('../controllers/cities');

/* GET users listing. */

router.get('/cities', isLoggedin, citiesCtrl.index);
router.put('/cities/:id', isLoggedin, citiesCtrl.updateCity);
router.post('/users/:id/cities', isLoggedin, citiesCtrl.addToProfile);
router.post('/cities', isLoggedin, citiesCtrl.create);



function isLoggedin(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');  
}

module.exports = router;
