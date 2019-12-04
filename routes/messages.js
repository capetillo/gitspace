var express = require('express');
var router = express.Router();
var messagesCtrl = require('../controllers/messages');

router.get('/', isLoggedin, messagesCtrl.index);
// router.post('/:id', isLoggedin, messagesCtrl.sendMessage)


function isLoggedin(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
    
}

module.exports = router;