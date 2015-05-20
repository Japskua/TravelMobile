/**
 * Created by Janne on 8.3.2015.
 */
"use strict";
define(['jquery','underscore','events'], function($,_, Events) {
    return function() {
        /*
         All views which listen to "manager:ready" event need to know which parts of UI need update.
         Also Manager need to know what kind of data views are asking. This is solved with action
         booleans.

         View action booleans:
         isAppData - Manager, Views
         isTraineeData - Manager, Views
         isDayData - Manager, Views
         */
        Events.on('manager:fetch', function(params) {
            if(params.isAppData) {
                manager.getAppData("");
                //manager.getAppData(params.userId);
            }
        });


        //Manager logic
        var manager = {
            //devRoute : "http://localhost:3000",
            devRoute : "http://localhost:5555",//"https://127.0.0.1:8888",
            prodRoute : "",
            //isDev : ($('#someid').attr('data-somename') === 'true'),
            isDev : true,


            //App's initial data, no specific day data
            getAppData: function (userId) {
                var self = this;
                var url = (this.isDev ? this.devRoute : this.prodRoute) + '/api/1/user/' + userId +'';
                /*$.get(url).success(function(data){
                    //Fetched from server
                    self.AppData = data;
                    Events.trigger('manager:ready',{isAppData: true});
                }).error(function() {
                    $('.id-loader').hide();
                    alert('Error: Palvelimeen ei saada yhteyttä!');
                }).always(function() {

                });*/
            },
            //AppData contains all application data for current user expect detailed day data
            AppData: null
        };

        return manager;
    };
});