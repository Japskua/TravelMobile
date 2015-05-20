"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

/* CONFIGURE PASSPORT */
var configurePassport = require('./js/authentication/passport-config');

// Configure the passport
configurePassport();

/* <<<----- END OF PASSPORT CONFIGURE ------>>> */

/* <<<--- REQUIRE ALL THE ROUTES --->>>> */

var login = require('./routes/authentication/login'),
    logged = require('./routes/authentication/logged'),
    logout = require('./routes/authentication/logout'),
    googleAuth = require('./routes/authentication/google-auth'),
    facebookAuth = require('./routes/authentication/facebook-auth'),
    account = require('./routes/account');

/* <<<---- END OF ROUTE REQUIRES ----->>>> */

var app = express();

/* <<<---- HELMET CONFIG ---->>>> */

app.use(helmet.contentSecurityPolicy({
    defaultSrc: ["'self'", 'default.com'],
    scriptSrc: ["'self'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'"],
    connectSrc: ["http://localhost:5555", "'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'self'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'self'"],
    //sandbox: ['allow-forms', 'allow-scripts'],
    //reportUri: '/report-violation',
    reportOnly: false, // set to true if you only want to report errors
    setAllHeaders: false, // set to true if you want to set all headers
    disableAndroid: false, // set to true if you want to disable Android (browsers can vary and be buggy)
    safari5: false // set to true if you want to force buggy CSP in Safari 5
}));

// Set same-origin policy
app.use(helmet.frameguard('sameorigin'));

// Change the powered by to something else
app.use(helmet.hidePoweredBy({ setTo: 'PHP/5.6.5' }));

// Prevent MIME sniffing
app.use(helmet.noSniff());


/* <<<---- END OF HELMET CONFIG ---->>> */

/* <<<--- DATABASE CONNECTION ------>>> */
mongoose.connect('mongodb://localhost/travelmobile');

/* <<<--- END OF DATABASE CONNECTION ------>>>> */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Session secrets */
app.use(session({
    secret : "secret_password",
    resave : false,
    saveUninitialized: true
}));


// Initialize the passport
app.use(passport.initialize());
app.use(passport.session());

/* <<<--- ROUTE DEFINITIONS HERE --->>> */

app.use('/', routes);
app.use('/users', users);
app.use('/api/1/account', account);
app.use('/api/1/login', login);
app.use('/api/1/logout', logout);
app.use('/api/1/logged', logged);
app.use('/api/1/auth/google', googleAuth);
app.use('/api/1/auth/facebook', facebookAuth);

/* <<<---- END OF ROUTE DEFINITIONS ----->>> */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
