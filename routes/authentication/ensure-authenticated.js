/**
 * Created by Janne on 29.1.2015.
 */
"use strict";


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // Otherwise, redirect
    res.redirect('/api/1/login/');
}

module.exports = ensureAuthenticated;