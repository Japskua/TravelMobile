/**
 * Created by Janne on 31.1.2015.
 */
"use strict";
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        moment: {
            exports: 'Moment'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },
        materialize : {
            deps : ['jquery'],
            exports : 'Materialize'
        },
        leaflet : {
            exports : 'Leaflet'
        },
        openlayers : {
            exports : 'OpenLayers'
        }
    },
    paths: {
        jquery:     '../components/jquery/dist/jquery.min',
        backbone:   '../components/backbone/backbone',
        bootstrap:  'libs/bootstrap.min',
        underscore: '../components/underscore/underscore-min',
        moment:     '../components/moment/min/moment-with-locales.min',
        materialize: '../components/materialize/dist/js/materialize.min',
        leaflet : '../components/leaflet/dist/leaflet',
        openlayers : '../components/openlayers/ol'
    }
});

window.App = window.App || {};

require(['backbone','router'], function (Backbone, Router) {
    window.App.Router = new Router();
    Backbone.history.start();
});