/**
 * Created by Janne on 31.1.2015.
 */
"use strict";

var moment = require('moment');

module.exports = exports = function lastModifiedPlugin (schema, options) {
    // Add last modified date to the schema
    schema.add({ lastModified: Date });

    // Add definition to schema, that before save, always run this function
    schema.pre('save', function (next) {
        this.lastModified = moment().format('YYYY-MM-DD');
        next();
    });

    if (options && options.index) {
        // Add this as indexed value
        schema.path('lastModified').index(options.index);
    }
}