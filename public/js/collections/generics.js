/**
 * Created by Janne on 31.1.2015.
 */
"use strict";
define(['backbone', 'models/generic'], function(Backbone, GenericModel) {
    return Backbone.Collection.extend({
        model: GenericModel,
        urlBase: '/api/measurements',
        urlComplete: undefined,
        url: function() {
            return this.urlComplete ? this.urlComplete : this.urlBase;
        },
        setUrl: function(path) {
            this.urlComplete = this.urlBase + path;
        }
    });
});