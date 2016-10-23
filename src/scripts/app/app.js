(function() {
    'use strict';

    angular.module('cdmp', ['cdmp.services', 'cdmp.controllers', 'cdmp.directives', 'cdmp.filters', /*'ngRoute',*/ 'ngSanitize', /*'ngCookies',*/ 'matchmedia-ng', 'duScroll', 'ngMask', 'rcMailgun', 'templates'])

    .config(['rcMailgunProvider', 'AnalyticsProvider',
        function(rcMailgunProvider, AnalyticsProvider) {

            rcMailgunProvider.configure({
                api_key: 'pubkey-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
            });

            // Setup Analytics
            var isProd = /PROD.com$/i.test(window.location.host);

            if (isProd) {

                AnalyticsProvider.setAccount([{
                    tracker: 'UA-xxxxxxxx-1',
                    name: 'default',
                    trackEvent: true
                }, {
                    tracker: 'UA-xxxxxxxx-2',
                    name: 'rollup',
                    trackEvent: true
                }, ]);

                AnalyticsProvider.setCookieConfig({
                    'cookieDomain': 'auto'
                });

            } else {

                AnalyticsProvider.setAccount([{
                    tracker: 'UA-xxxxxxxx-3',
                    name: 'default',
                    trackEvent: true
                }, {
                    tracker: 'UA-xxxxxxxx-4',
                    name: 'rollup',
                    trackEvent: true
                }, ]);

                AnalyticsProvider.setCookieConfig({
                    'cookieDomain': 'none'
                });

                // Turn on to load debug version of analytics (prints a lot of stuff to the console)
                // AnalyticsProvider.enterDebugMode(true);
            }

            // Track all routes (default is true).
            AnalyticsProvider.trackPages(true);

            // Use ga.js (classic) instead of analytics.js (universal)
            // By default, universal analytics is used, unless this is called with a falsey value.
            AnalyticsProvider.useAnalytics(true);

            // set to true when using angular routing
            AnalyticsProvider.ignoreFirstPageLoad(false);


        }
    ])

    .run(['$rootScope',

        function($rootScope) {

            FastClick.attach(document.body);

        }
    ]);

}).call(this);
