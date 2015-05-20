/**
 * Created by Janne on 29.1.2015.
 */
"use strict";
var express = require('express');
var router = express.Router();


/* GET /login/ */
router.get('/', function(req, res){
    res.render('login', { user: req.user });
});

module.exports = router;