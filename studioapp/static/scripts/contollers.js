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
        $scope.getFollowers = function (username,direction,count) {
            var getListData = {
                'username'  : username,
                'direction' : direction,
                "count": count
            };
            var getListDataJson = JSON.stringify(getListData);
            console.log(getListDataJson);
            $http({
                method: 'POST',
                url: '/insta_api/add_task',
                data : getListDataJson
            }).then(
                function successCallback(response) {
                    // $scope.users = response.data;
                    window.location = "http://studio7day.herokuapp.com/#/tasks";
                },
                function errorCallback(response) {
                    $scope.errorMss = 'Something wrong, ' + ' status ' + '" ' + response.status+' "';
                });
        };
//check or uncheckall checkboxes
        $scope.checkUnCheckAll = function (param) {
            var checkboxes = document.querySelectorAll('.checkbox');
            var boolean;
            switch (param) {
                case 'check':
                    boolean = true;
                    break;
                case 'uncheck':
                    boolean = false;
                    break;
                default:
                    alert( 'Error' );
            }
            for( var i = 0; i <= checkboxes.length; i++){
                if(checkboxes[i]) {
                    checkboxes[i].checked = boolean;
                }
            }
        };
//send list of users names for subscribe or unsubscribe
        var usersNames;
        var usersNamesObject;
        $scope.followUnfollowAll =function (param) {
            preloader.style.display='block';
            usersNames = [];
            var usersList = document.querySelectorAll('.checkbox:checked');
            var action;
            for( var i = 0; i < usersList.length; i++){
                usersNames.push(usersList[i].value);
            }
            switch (param) {
                case 'follow':
                    action = 'follow';
                    break;
                case 'unfollow':
                    action = 'unfollow';
                    break;
                default:
                    alert( 'Error' );
            }
            usersNamesObject = {
                "user_names": usersNames,
                "direction": action
            };
            var usersNamesJson = JSON.stringify(usersNamesObject);
            console.log(usersNamesJson);
            $http({
                method: 'POST',
                url: '/insta_api/add_task',
                data : usersNamesJson
            }).then(
                function successCallback(response) {
                    preloader.style.display='none';
                },
                function errorCallback(response) {
                    preloader.style.display='none';
                });
        };
//send current user name for subscribe or unsubscribe
        $scope.followUnfollowThis = function (name,action) {
            console.log(name,action);
            var userNameObject;
            switch (action) {
                case 'follow':
                    action = 'follow';
                    break;
                case 'unfollow':
                    action = 'unfollow';
                    break;
                default:
                    alert( 'Error' );
            }
            userNameObject = {
                "user_names": name,
                "direction": action
            };
            var userNameJson = JSON.stringify(userNameObject);
            console.log(userNameJson);
            $http({
                method: 'POST',
                url: '/insta_api/add_task',
                data : userNameJson
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
        }, 2000);

        $scope.getTask = function (taskId) {
            localStorage.setItem('taskId',taskId);
            window.location = "http://studio7day.herokuapp.com/#/task";
        };
    }])

    .controller('getTaskController', ['$scope','$http', function($scope,$http) {

        function getTaskInfo(){
            var task_id = localStorage.getItem('taskId');
            console.log(task_id);
            $http({
                method: 'GET',
                url: '/insta_api/get_task_result/request_'+task_id
            }).then(
                function successCallback(response) {
                    $scope.users = response.data;
                },
                function errorCallback(response) {
                    $scope.errorMss = 'Something wrong, ' + ' status ' + '" ' + response.status+' "';
                });
        }
        setInterval(function(){
            getTaskInfo();
        }, 2000);
    }])
;































