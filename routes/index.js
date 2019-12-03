var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
router.get('/oauth2callback', //function (req, res) {
  
  passport.authenticate(
    'google',
    {
      successRedirect: '/users/:id',
      failureRedirect: '/users'
    }
  )
//}
);
// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/users');
});


module.exports = router;
