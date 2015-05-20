/**
 * Created by parkkila on 30.1.2015.
 */
"use strict";

var mongoose = require('mongoose');
var moment = require('moment');
var userSchema = require('./schemas/user-schema');
var winston = require('winston');

function UserDb() {

}


UserDb.prototype.findUser = function(queryJson, callback) {
    // Check that the queryJson is not empty
    if(!queryJson) {
        winston.error("UserDb.findUser() - queryJson was empty");
        callback("query JSON was empty", null);
        return;
    }

    // Okay, try to find the user
    var User = mongoose.model('User', userSchema);
    User.findOne(queryJson, callback);

};

UserDb.prototype.removeUser = function(queryJson, callback) {
    // First, check that the queryJson is not empty
    if(!queryJson) {
        winston.error("UserDb.removeUser() - queryJson was empty");
        callback("query JSON was empty", null);
        return;
    }

    // Make the model for removal
    var User = mongoose.model('User', userSchema);
    // And execute
    User.findOneAndRemove(queryJson, callback);
};


UserDb.prototype.updateUser = function(queryJson, updateJson, callback) {
    // First, check that the queryJson is not empty
    if(!queryJson) {
        winston.error("UserDb.updateUser() - queryJson was empty");
        callback("query JSON was empty", null);
        return;
    }
    // Also, make sure that the updateJson is not empty
    if(!updateJson) {
        winston.error("UserDb.updateUser() - updateJson was empty");
        callback("update JSON was empty", null);
        return;
    }

    // Try to update the user
    var User = mongoose.model('User', userSchema);

    User.findOneAndUpdate(queryJson, updateJson, callback);
};

UserDb.prototype.createUser = function(userJson, callback) {
    // Check that the userJson is not empty
    if (!userJson) {
        winston.error("UserDb.createUser() - userJson was empty");
        callback("create user information was empty", null);
        return;
    }

    var User = mongoose.model('User', userSchema);
    var user = new User();

    console.log("Received thing is:", userJson);

    // Set all the names from the JSON
    user.facebookId = userJson.facebookId || "";
    user.facebookVerified = userJson.facebookVerified || false;
    user.facebookLink = userJson.profileUrl || "";
    user.googleId = userJson.googleId || "";
    user.facebookAdded = userJson.facebookAdded || false;
    user.googleAdded = userJson.googleAdded || false;
    user.familyName = userJson.name.familyName || "";
    user.givenName = userJson.name.givenName || "";
    user.displayName = userJson.displayName || "";
    user.emails = userJson.emails || [""];
    user.plusLink = userJson.plusLink || "";
    user.plusPicture = userJson.plusPicture || "";
    user.gender = userJson.gender || "";
    user.locale = userJson.locale || "";
    user.registerDate = moment().format();
    user.lastLogin = moment().format();

    // Then save
    user.save(callback);
};

module.exports = UserDb;