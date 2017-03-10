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
        $scope.getFollowers = function (username,direction) {
            console.log(username,direction) ;
            $http({
                method: 'POST',
                url: '../new.json',
                data : {
                    'username'  : username,
                    'direction' : direction
                }
            }).then(
                function successCallback(response) {
                    $scope.users = response.data;
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
//send list of users id-s
        var usersId = [];
        $scope.unSubscribe =function () {
            var usersList = document.querySelectorAll('.checkbox:checked');
            for( var i = 0; i < usersList.length; i++){
                usersId.push(usersList[i].value);
            }
            $http({
                method: 'POST',
                url: 'http://example.com',
                data : usersId
            }).then(
                function successCallback(response) {
                    console.log(typeof(usersId),usersId);
                },
                function errorCallback(response) {
                    console.log(typeof(usersId),usersId);
            });
        };

    }])
;































