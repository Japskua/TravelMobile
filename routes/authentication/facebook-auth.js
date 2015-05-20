/**
 * Created by Janne on 31.1.2015.
 */
"use strict";
var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback

/* GET /api/1/auth/facebook/ */
router.get('/',
    passport.authenticate('facebook'/*,
        { scope: ['read_stream',     // Read user stream
                  'publish_actions'  // Publish on behalf the user
        ]}*/
    ),
    function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
    });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
/* GET /api/1/auth/facebook/callback/ */
router.get('/callback/',
    passport.authenticate('facebook', { failureRedirect: '/api/1/login/' }),
    function(req, res) {
        res.redirect('/api/1/logged/');
    });

module.exports = router;