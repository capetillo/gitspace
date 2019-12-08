var express = require('express');
var router = express.Router();
var citiesCtrl = require('../controllers/cities');

/* GET users listing. */

router.get('/users/:id/cities', isLoggedin, citiesCtrl.index);
// router.put('/users/:id/cities/:cityId', isLoggedin, citiesCtrl.updateCity);
// router.post('/users/:id/cities', isLoggedin, citiesCtrl.addToProfile);
router.post('/users/cities', isLoggedin, citiesCtrl.create);



function isLoggedin(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');  
}

module.exports = router;
