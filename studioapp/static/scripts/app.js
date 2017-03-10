
'use strict';

angular.module('application', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : '/static/views/header.html'
                    },
                    'content': {
                        templateUrl : '/static/views/main.html',
                        controller  : 'mainController'
                    },
                    'footer': {
                        templateUrl : '/static/views/footer.html'
                    }
                }
            })

        .state('app.main', {
            url:'main',
            views: {
                'content@': {
                    templateUrl : '/static/views/main.html',
                    controller  : 'mainController'
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    })
;