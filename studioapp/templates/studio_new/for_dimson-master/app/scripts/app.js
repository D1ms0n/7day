'use strict';

angular.module('application', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/main.html',
                        controller  : 'mainController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })

        .state('app.main', {
            url:'main',
            views: {
                'content@': {
                    templateUrl : 'views/main.html',
                    controller  : 'mainController'
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    })
;