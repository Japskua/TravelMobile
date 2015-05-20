/**
 * Created by Janne on 8.1.2015.
 */
"use strict";
var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleInfo = require('./google-info'),
    FacebookInfo = require('./facebook-info'),
    UserManager = require('./../user-manager');

function configurePassport() {

    var devEnv = true;
    var useHttps = false;
    var callbackUrlGoogle;
    var callbackUrlFacebook;

    if (devEnv) {
        if (useHttps) {
            callbackUrlGoogle = "https://127.0.0.1:5555/api/1/auth/google/callback";
            callbackUrlFacebook = "https://localhost:5555/api/1/auth/facebook/callback";
        } else {
            // Plain HTTP
            callbackUrlGoogle = "http://127.0.0.1:5555/api/1/auth/google/callback";
            callbackUrlFacebook = "http://127.0.0.1:5555/api/1/auth/facebook/callback";
        }
    }
    // Production environment
    else {
        if (useHttps) {
            callbackUrlGoogle = "https://178.62.215.70:5555/api/1/auth/google/callback";
            callbackUrlFacebook = "https://178.62.215.70:5555/api/1/auth/facebook/callback";
            throw new Error("Production environment not configured!");
        } else {
            // Plain HTTP
            callbackUrlGoogle = "http://178.62.215.70:5555/api/1/auth/google/callback";
            callbackUrlFacebook = "http://178.62.215.70:5555/api/1/auth/facebook/callback";
            throw new Error("Production environment not configured!");
        }

    }

    // API Access link for creating client ID and secret:
    // https://code.google.com/apis/console/
    var googleInfo = new GoogleInfo();
    var facebookInfo = new FacebookInfo();

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
            clientID: googleInfo.ClientId(),
            clientSecret: googleInfo.ClientSecret(),
            callbackURL: callbackUrlGoogle
        },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // To keep the example simple, the user's Google profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Google account with a user record in your database,
                // and return that user instead.
                console.log("accessToken:", accessToken);
                console.log("refreshToken:", refreshToken);
                console.log("profile:", profile);
                profile.token = accessToken;

                // Create a new user or find it if not exists
                var userManager = new UserManager();
                userManager.getUserOrCreateIfNotExists("google", profile, function(err, result) {
                    if (err) {
                        return done(err, null);
                    }
                    // Things okay
                    return done(null, profile);
                });

            });
        }
    ));


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
    passport.use(new FacebookStrategy({
            clientID: facebookInfo.FACEBOOK_CLIENT_ID,
            clientSecret: facebookInfo.FACEBOOK_CLIENT_SECRET,
            callbackURL: callbackUrlFacebook
        },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // To keep the example simple, the user's Facebook profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Facebook account with a user record in your database,
                // and return that user instead.
                console.log("accessToken:", accessToken);
                console.log("refreshToken:", refreshToken);
                console.log("profile:", profile);

                // Set the profile token
                profile.token = accessToken;

                // Create a new user or find it if not exists
                var userManager = new UserManager();
                userManager.getUserOrCreateIfNotExists("facebook", profile, function(err, result) {
                    if (err) {
                        return done(err, null);
                    }
                    // Things okay
                    return done(null, profile);
                });
            });
        }
    ));

}

module.exports = configurePassport;