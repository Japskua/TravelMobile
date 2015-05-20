/**
 * Created by Janne on 31.1.2015.
 */
"use strict";
define(['backbone',
        'events',
        'data-manager',
        'views/home',
        'views/account',
        'views/around-me'],
    function (Backbone, Events, DataManager, HomeView, AccountView, AroundMeView) {

        return Backbone.Router.extend({
            routes: {
                "": "home",
                "account" : "account",
                "aroundMe" : "aroundMe"
            },
            initialize: function() {
                var self = this;

                this.dataManager = new DataManager();

                this.homeView = new HomeView({ dataManager : this.dataManager});
                this.accountView = new AccountView({ dataManager : this.dataManager});
                this.aroundMeView = new AroundMeView({ dataManager : this.dataManager});


                // Listener for navigation events on all views
                Events.on('router:navigate', function(params) {
                    console.log("Navigate command received. params:", params, "params.url:", params.url);
                    self.navigate(params.url, { trigger : true});
                });

                this.currentView = null;

            },
            home: function() {
                console.log("Home!");
                if(!this.homeView.isCurrentView) {
                    this.changeView(this.homeView);
                }
            },
            account : function() {
                console.log("Account View!");
                if(!this.accountView.isCurrentView) {
                    this.changeView(this.accountView);
                }
            },
            aroundMe : function() {
                console.log("Around Me View!");
                if(!this.aroundMeView.isCurrentView) {
                    this.changeView(this.aroundMeView);
                    this.aroundMeView.initMap();
                }
            },
            changeView: function(nextView) {
                var self = this;
                //UI view switching logic
                //The current view does not exist
                if(this.currentView) {
                    this.currentView.$el.fadeOut(function() {
                        nextView.$el.fadeIn(function() {
                        });
                    });
                    this.currentView.isCurrentView = false;
                }else {
                    nextView.$el.fadeIn();
                }
                //Set as the new current view
                nextView.isCurrentView = true;
                this.currentView = nextView;
            }
        });
    });