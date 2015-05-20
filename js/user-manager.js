/**
 * Created by Janne on 31.1.2015.
 */
"use strict";

var UserDb = require('./database/user-db');
var winston = require('winston');

function UserManager () {

}

/**
 * Gets the user from the database or creates one if not found
 * @param {String} serviceType Type of the service got ("facebook" / "google")
 * @param {Object} json
 * @param {Function} callback
 */
UserManager.prototype.getUserOrCreateIfNotExists = function(serviceType, json, callback) {
    switch(serviceType) {
        case "facebook":
            this.findUserFacebook(json, function(err, user) {
                if(!user) {
                    // We need to add a new user to the database
                    json.facebookId = json.id;
                    json.facebookLink = json.profileUrl;
                    json.locale = json._json.locale.split("_")[0];
                    json.facebookAdded = true;
                    json.facebookVerified = json._json.verified;

                    // Create the user
                    new UserManager().createNewUser(json, callback);
                    return;
                }
                // Return the found user information
                callback(null, user);
            });
            break;
        case "google":
            this.findUserGoogle(json, function(err, user) {
                if(!user) {
                    // No user found, so need to create a new user
                    json.googleAdded = true;
                    json.googleId = json.id;
                    json.locale = json._json.locale;
                    json.plusPicture = json._json.picture;
                    json.plusLink = json._json.link;
                    json.gender = json._json.gender;

                    new UserManager().createNewUser(json, callback);
                    return;
                }
                // Return the found user information
                callback(null, user);
            });
            break;
        default :
            winston.error("UserManager.getUserOrCreateIfNotExists() - serviceType was unrecognized: " + serviceType.toString());
            callback("User finding went wrong", null);
            break;
    }
};

/**
 * Finds the given user based on received facebook credentials
 * @param {Object} json
 * @param {Function} callback
 */
UserManager.prototype.findUserFacebook = function(json, callback) {
    var userDb = new UserDb();
    userDb.findUser({ facebookId : json.id}, callback);
};

/**
 * Finds the given user based on received google credentials
 * @param {Object} json
 * @param {Function} callback
 */
UserManager.prototype.findUserGoogle = function(json, callback) {
    var userDb = new UserDb();
    userDb.findUser({ googleId : json.id}, callback);
};

/**
 * Creates a new user with the given information
 * @param {Object} json
 * @param {Function} callback
 */
UserManager.prototype.createNewUser = function(json, callback) {
    var userDb = new UserDb();
    userDb.createUser(json, callback);
};

UserManager.prototype.linkNewService = function(serviceType, json) {
    switch(serviceType) {
        case "facebook":
            this.addFacebook(json);
            break;
        case "google":
            this.addGoogle(json);
            break;
        default :
            winston.error("UserManager.createNewUser() - serviceType was unrecognized: " + serviceType.toString());
            break;
    }
};

UserManager.prototype.addFacebook = function(json) {

};

UserManager.prototype.addGoogle = function(json) {

};

module.exports = UserManager;