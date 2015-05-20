/**
 * Created by Janne on 29.1.2015.
 */
"use strict";
var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /api/auth/google/callback

/* GET /api/1/auth/google/ */
router.get('/',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', // Basic profile & circles
            'https://www.googleapis.com/auth/plus.profile.emails.read' // View email
//            'https://www.googleapis.com/auth/drive', // View and manage drive
//            'https://www.googleapis.com/auth/youtube' // Manage youtube account
        ] }),

    function(req, res){
        // The request will be redirected to Google for authentication, so this
        // function will not be called.
    });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

/* GET /api/1/auth/google/callback/ */
router.get('/callback/',
    passport.authenticate('google', { failureRedirect: '/api/1/login/' }),
    function(req, res) {
        res.redirect('/api/1/logged/');
    });


module.exports = router;