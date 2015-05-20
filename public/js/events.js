/**
 * Created by Janne on 2.2.2015.
 */
"use strict";
define(["underscore", "backbone"], function(_, Backbone) {
    var o = {};
    _.extend(o, Backbone.Events);
    return o;
});