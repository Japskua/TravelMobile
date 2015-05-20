
/**
 * Created by Janne on 20.5.2015.
 */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var lastModifiedPlugin = require('./plugins/last-modified-plugin');

var LocationSchema = new Schema({
    name : { type : String, required : true },
    loc : {
        type : [Number],  // [<longititude>, <latitude>]
        index : '2dsphere',
        required : true
    }
});

LocationSchema.plugin(lastModifiedPlugin, { index : true});

module.exports = LocationSchema;
