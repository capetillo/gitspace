var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users')

/* GET users listing. */

router.get('/', usersCtrl.index);
router.post('/:id', isLoggedin, usersCtrl.shareStatus)
router.get('/:id', isLoggedin, usersCtrl.viewProfile)

function isLoggedin(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
    
}

module.exports = router;
