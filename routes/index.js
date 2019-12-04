var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
const rootURL = 'https://api.github.com/';

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
      successRedirect: '/users',
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

router.get('/', function(req, res) {
  res.render('index', {userData: null});
});

router.post('/', function(req, res) {
  var options = {
    url: rootURL + 'users/' + req.body.username,
    headers: {
      'User-Agent': 'capetillo',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };
  request(options, function(err, response, body) {
    var userData = JSON.parse(body);
   res.render('index', {userData: userData});
  });
});

module.exports = router;
