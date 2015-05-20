/**
 * Created by Janne on 31.1.2015.
 */
"use strict";
define(['jquery',
        'backbone',
        'bootstrap',
        'events',
        'text!templates/home.html'],
    function($, Backbone, Bootstrap, Events, Template) {

        return Backbone.View.extend({
            initialize : function(params) {
                var self = this;
                this.dataManager = params.dataManager;

                this.isCurrentView = false;

                this.childViews = [];

                this.render();
            },
            template : _.template(Template),

            render : function() {
                this.$el.html(this.template({ title : "tester-title"}));
                this.$el.hide();
                $('#main-container').append(this.el);

                _.forEach(this.childViews, function(child) {
                    child.render();
                });

                return this;
            },
            events : {
                'click #trakme-go-feelings' : function() {
                    console.log("Click!");
                    Events.trigger('router:navigate', {url : '#feelings'});
                },
                'click #trakme-modal' : function() {
                    console.log("Modal clicked!");
                    $('#modal1').openModal();
                }
            },
            close : function() {
                this.remove();
            }
        });
    });