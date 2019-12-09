var express = require('express');
var router = express.Router();
var citiesCtrl = require('../controllers/cities');

/* GET users listing. */

router.get('/users/:id/cities', isLoggedin, citiesCtrl.index);
router.post('/users/:id/cities', isLoggedin, citiesCtrl.create);
router.put('/users/:id/cities', isLoggedin, citiesCtrl.updateCity);





function isLoggedin(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');  
}

module.exports = router;
