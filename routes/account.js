/**
 * Created by Janne on 29.1.2015.
 */
"use strict";
var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('./authentication/ensure-authenticated');

/* GET /api/1/account/ */
router.get('/', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
});


module.exports = router;
