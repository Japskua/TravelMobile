/**
 * Created by Janne on 29.1.2015.
 */
"use strict";
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;