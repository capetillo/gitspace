var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var methodOverride = require('method-override');


// load the env vars
require('dotenv').config();

// require our routes
var indexRoutes = require('./routes/index');
var usersRoutes = require('./routes/users');
var citiesRoutes = require('./routes/cities');

// create the Express app
var app = express();

// socket setupp


// connect to the MongoDB with mongoose
require('./config/database');
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'gitspace',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// mount all routes with appropriate base paths
app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/', citiesRoutes)

// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
