"use strict";
var express = require('express'),
    router = express.Router(),
    google = require('googleapis'),
    OAuth2 = google.auth.OAuth2,
    winston = require('winston'),
    moment = require('moment'),
    ensureAuthenticated = require('./ensure-authenticated');


/* GET /logged/ */
router.get('/', ensureAuthenticated, function(req, res){

    // Set the global google info here
    setGlobalGoogleAuth(req.user);

    // TODO: Find the user and if not, create him/her

    authDone(req, res);

    /**
     * Sets the global google authentication
     * @param user The user session information
     */
    function setGlobalGoogleAuth(user) {
        // Set the global authentication for google services onwards
        var oauth2client = new OAuth2();
        //console.log("OAuth Client done", oauth2client);
        oauth2client.setCredentials({
            access_token : user.token,
            refresh_token : ""
        });

        // Set the authentication as global
        google.options({ auth : oauth2client});
    }

    /**
     * Function that is called once authentication is done (user is found or a new one is created)
     * @param req The HTTP request object
     * @param res The HTTP response object
     */
    function authDone(req, res) {

        // Then, just redirect somewhere
        res.redirect('/');
    }
});

module.exports = router;