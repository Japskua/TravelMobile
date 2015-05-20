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

                var view = new OpenLayers.View({
                    center : [0,0],
                    zoom : 2
                });

                var map = new OpenLayers.Map({
                    target : 'map',
                    layers : [
                        new OpenLayers.layer.Tile({
                            source : new OpenLayers.source.OSM()
                        })
                    ],
                    controls: OpenLayers.control.defaults({
                        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                            collapsible: false
                        })
                    }),
                    view: view
                });

                var geolocation = new OpenLayers.Geolocation({
                    projection : view.getProjection()
                });

                geolocation.setTracking(true);

                var positionFeature = new OpenLayers.Feature();
                positionFeature.setStyle(new OpenLayers.style.Style({
                    image : new OpenLayers.style.Circle({
                        radius : 6,
                        fill : new OpenLayers.style.Fill({
                            color : '#3399CC'
                        }),
                        stroke: new OpenLayers.style.Stroke({
                            color: '#fff',
                            width: 2
                        })
                    })
                }));

                var accuracyFeature = new OpenLayers.Feature();
                geolocation.on('change:accuracyGeometry', function() {
                    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
                });


                geolocation.on('change:position', function() {
                    var coordinates = geolocation.getPosition();
                    positionFeature.setGeometry(coordinates ?
                        new OpenLayers.geom.Point(coordinates) : null);

                    view.setCenter(coordinates);
                    view.setZoom(17);
                });

                var featuresOverlay = new OpenLayers.FeatureOverlay({
                    map : map,
                    features : [accuracyFeature, positionFeature]
                });
            },
            events : {
            },
            close : function() {
                this.remove();
            }
        });
    });