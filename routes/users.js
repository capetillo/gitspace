var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

/* GET users listing. */

router.get('/', usersCtrl.index);
router.post('/:id', isLoggedin, usersCtrl.shareStatus);
router.get('/:id', isLoggedin, usersCtrl.viewProfile);
router.get('/:id/messages', isLoggedin, usersCtrl.viewInbox);
router.post('/:id/messages', isLoggedin, usersCtrl.sendMessage);
router.delete('/:id/messages/:messageId', isLoggedin, usersCtrl.delete);


function isLoggedin(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');  
}

module.exports = router;
