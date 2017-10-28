
'use strict';

angular.module('application', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
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
        })
        .state('app.tasks', {
            url:'tasks',
            views: {
                'content@': {
                    templateUrl : '/static/views/tasks.html',
                    controller  : 'getTasksController'
                }
            }
        })
        .state('app.task', {
            url:'task',
            views: {
                'content@': {
                    templateUrl : '/static/views/task.html',
                    controller  : 'mainController'
                }
            }
        });
        $urlRouterProvider.otherwise('/');
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    })
;