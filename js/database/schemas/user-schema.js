/**
 * Created by parkkila on 30.1.2015.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var lastModifiedPlugin = require('./plugins/last-modified-plugin');



var userSchema = new Schema({
    facebookAdded : { type : Boolean, default : false},
    googleAdded : { type : Boolean, default : false},
    facebookId :  { type : String, default : ""},
    facebookVerified : { type : Boolean, default : false},
    facebookLink : { type : String, default : ""},
    googleId : { type : String, default : ""},
    familyName : { type : String, default : ""},
    givenName : { type : String, default : ""},
    displayName : { type : String, default : ""},
    emails : { type : [String], default : [""]},
    plusLink : { type : String, default : ""},
    plusPicture : { type : String, default : ""},
    gender : { type : String, default : ""},
    locale : { type : String, default : ""},
    registerDate : { type : Date, default : moment().format()},
    lastLogin : { type : Date, default : moment().format()}
});

// Add the plugin, indexing the last modified
userSchema.plugin(lastModifiedPlugin, { index : true});

module.exports = userSchema;