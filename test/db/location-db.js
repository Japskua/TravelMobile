/**
 * Created by Janne on 20.5.2015.
 */
"use strict";

var should = require('should');
var LocationDb = require('./../../js/database/location-db');
var mongoose = require('mongoose');

describe('Testing location database functions', function() {

    mongoose.connect('mongodb://localhost/travelmobile');

    var locationDb = new LocationDb();
    var testLocation = {
        name : "Test Location",
        loc : [30.003, 50.003]
    };

    before(function(done) {
        // Create test location points

        done();
    });

    after(function(done) {
        // Remove the test location points

        done();
    });

    describe('Testing creation of a location to the database', function() {

        it('Should save the location properly', function(done) {

            locationDb.createLocation(testLocation, function(err, result) {
                if (err) {
                    throw err;
                }

                console.log("Result of the creation:", result);
                done();
            });

        });

    });

    describe('Testing of finding locations nearby', function() {
        it('Should find a location close by', function(done) {
            var searchLocation = { type : "Point", coordinates : [30.003, 50.00]};
            var query = {
                loc : searchLocation,
                maxDistance : 1000,
                spherical : true
            };
            locationDb.findNearby(searchLocation, function(err, result) {
                if(err) {
                    throw err;
                }
                console.log("Found the following nearby:", result);
                done();
            });
        });
    });

    describe('Testing removal of location from the database', function() {

        it("Should remove the given location from the database", function(done) {

            locationDb.removeLocation(testLocation, function(err, result) {
                if (err) {
                    throw err;
                }

                console.log("Result of the removal:", result);
                done();
            })
        });
    });

});