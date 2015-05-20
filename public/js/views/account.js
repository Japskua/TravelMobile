/**
 * Created by Janne on 8.3.2015.
 */
"use strict";
define(['backbone',
        'bootstrap',
        'events',
        'text!templates/account.html'],
    function(Backbone, Bootstrap, Events, Template) {

        return Backbone.View.extend({
            initialize : function(params) {

                this.dataManager = params.dataManager;
                this.isCurrentView = false;
                console.log("Account initialized");
                var self = this;

                // Fetch the current account details from the backend
                this.retrieveAccounts();
                this.childViews = [];

                this.render();

            },
            template : _.template(Template),

            render : function() {
                var self = this;
                console.log("Account render() here!");
                this.$el.html(this.template({ title : "Account-page"}));
                this.$el.hide();
                $('#main-container').append(this.el);

                // Render children, if any
                _.forEach(this.childViews, function(child) {
                    child.render();
                });
                return this;
            },

            retrieveAccounts : function() {
                var self = this;

                var url = (this.dataManager.isDev ? this.dataManager.devRoute : this.dataManager.prodRoute) + '/api/1/accounts/';
                /*$.get(url).success(function(data){
                    //Fetched from server
                    self.AppData = data;
                    Events.trigger('manager:ready',{isAppData: true});
                }).error(function() {
                    $('.t4-loader').hide();
                    alert('Error: Palvelimeen ei saada yhteyttä!');
                }).always(function() {

                });*/
            }
        });
    });