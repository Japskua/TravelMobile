/**
 * Created by Janne on 19.5.2015.
 */
"use strict";
define(['jquery',
        'backbone',
        'bootstrap',
        'openlayers',
        'events',
        'text!templates/around-me.html',
        'text!templates/around-me-children/map.html',
        'text!templates/around-me-children/wifi-listing.html'],
    function($, Backbone, Bootstrap, OpenLayers, Events, Template,MapTemplate,WifiListingTemplate) {

        return Backbone.View.extend({
            initialize : function(params) {
                var self = this;
                this.dataManager = params.dataManager;

                this.isCurrentView = false;

                this.childViews = [];

                this.render();
            },
            template : _.template(Template),
            templateMap : _.template(MapTemplate),
            templateWifiListing : _.template(WifiListingTemplate),

            render : function() {
                this.$el.html(this.template({ title : "tester-title"}));


                this.$('#tm-map').html(this.templateMap({}));
                this.$('#tm-wifi-listing').html(this.templateWifiListing({}));

                // Hiding element before append
                this.$el.hide();
                $('#main-container').append(this.el);

                _.forEach(this.childViews, function(child) {
                    child.render();
                });

                // Initialize the map last

                return this;
            },
            initMap : function() {
                var map = new OpenLayers.Map({
                    target : 'map',
                    layers : [
                        new OpenLayers.layer.Tile({
                            source : new OpenLayers.source.MapQuest({layer : 'sat'})
                        })
                    ],
                    view : new OpenLayers.View({
                        center : OpenLayers.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
                        zoom : 4
                    })
                })
            },
            events : {
            },
            close : function() {
                this.remove();
            }
        });
    });