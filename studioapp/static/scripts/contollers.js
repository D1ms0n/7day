'use strict';
angular.module('application')
    .controller('loginController', ['$scope','$http', function($scope,$http) {
//send login info
        $scope.loginSubmit = function (login,password) {
            console.log(login,password);
            $http({
                method: 'POST',
                url: 'http://example.com',
                data : {
                            'login'  : login,
                            'password' : password
                        }
            }).then(
                function successCallback(response) {
                console.log('ok',response);
            },
                function errorCallback(response) {
                    $scope.errorMss = 'Something wrong, ' + ' status ' + '" '+response.status+' "';
                    
            });
        }
    }])
    .controller('mainController', ['$scope','usersFactory','$http', function($scope, usersFactory, $http) {
//send search keyword
        var preloader = document.getElementById('preloader');
        $scope.getFollowers = function (username,direction) {
            preloader.style.display='block';
            console.log(username,direction) ;
            $http({
                method: 'POST',
                url: '/insta_api/add_task',
                data : {
                    'username'  : username,
                    'direction' : direction
                }
            }).then(
                function successCallback(response) {
                    $scope.users = response.data;
                    preloader.style.display='none';
                },
                function errorCallback(response) {
                    $scope.errorMss = 'Something wrong, ' + ' status ' + '" ' + response.status+' "';
                });
        };
//check all checkboxes
        $scope.checkAll = function () {
            //var elements = document.getElementsByClassName('checkbox');
            var elements = document.querySelectorAll('.checkbox');
            for( var i = 0; i <= elements.length; i++){
                elements[i].checked = true;
                console.log(typeof(elements[i]),elements[i]);
            }
        };
//uncheck all checkboxes
        $scope.unCheckAll = function () {
            var elements = document.querySelectorAll('.checkbox');
            for( var i = 0; i <= elements.length; i++){
                var elements = document.querySelectorAll('.checkbox');
                elements[i].checked = false;
            }
        };
//send list of users id-s for unsubscribe
        var usersId = [];
        $scope.unSubscribe =function () {
            preloader.style.display='block';
            var usersList = document.querySelectorAll('.checkbox:checked');
            for( var i = 0; i < usersList.length; i++){
                usersId.push(usersList[i].value);
            }
            var usersIdJs = JSON.stringify(usersId);
            console.log(usersIdJs);
            $http({
                method: 'POST',
                url: 'http://example.com',
                data : usersIdJs
            }).then(
                function successCallback(response) {
                    preloader.style.display='none';
                },
                function errorCallback(response) {
                    preloader.style.display='none';
                });
        };
    }])

    .controller('getTasksController', ['$scope','$http', function($scope,$http) {
//get tasks
        function getTasks(){
            $http({
                method: 'GET',
                url: '/insta_api/get_tasks'
            }).then(
                function successCallback(response) {
                    $scope.tasks = response.data;
                });
        }
        setInterval(function(){
            getTasks();
            console.log('get times')
        }, 5000);
    }])

    .controller('getTaskController', ['$scope','$http', function($scope,$http) {

    }])

;































