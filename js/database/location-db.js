/**
 * Created by Janne on 20.5.2015.
 */
"use strict";

var mongoose = require('mongoose');
var LocationSchema = require('./schemas/location-schema');
var winston = require('winston');

function LocationDb() {

}

LocationDb.prototype.createLocation = function(query, callback) {
    if(!query) {
        winston.error("Query was missing");
        callback("No query received", null);
        return;
    }

    var Location = mongoose.model('Location', LocationSchema);
    console.log("Creating the new location");
    var location = new Location(query);

    console.log("Received the following for a new location:", query);

    location.save(callback);
};

LocationDb.prototype.removeLocation = function(query, callback) {
    if(!query) {
        winston.error("Query was missing");
        callback("No query received", null);
        return;
    }

    var Location = mongoose.model('Location', LocationSchema);
    // Remove
    Location.findOneAndRemove(query, callback);

};

LocationDb.prototype.findNearby = function(query, callback) {
    if(!query) {
        winston.error("Query was missing");
        callback("No query received", null);
        return;
    }

    // The default values
    var spherical = true;
    var maxDistance = 1000;
    // Read if some other values were passed
    if (query.spherical) {
        spherical = query.spherical;
    }
    if (query.maxDistance) {
        maxDistance = query.maxDistance;
    }

    console.log("Searching for nearby:", query);

    var Location = mongoose.model('Location', LocationSchema);
    // Find nearby
    Location.geoNear(query, { maxDistance : maxDistance, spherical : spherical}, callback);

};

module.exports = LocationDb;