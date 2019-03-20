var app = angular.module('uniccan', []);
app.controller('notificationsCtrl', function ($scope, $http) {
    $scope.notifications = [];
    $scope.chats = [];
    ($scope.mynotifications = function () {
        $http({
            url: '/mynotifications',
            method: 'GET',
        }).then(function (res) {
            console.log(res.data);
            $scope.notifications = res.data;
            $scope.mychats();
        }, function (res) {});
    })();
    $scope.mychats = function () {
        $http({
            url: '/mychats',
            method: 'GET',
        }).then(function (res) {
            console.log(res.data);
            res.data.forEach(user => {
                let f = $scope.check(user.email);
                // console.log(user.email, f);
                if (!f) {
                    $scope.chats.push(user);
                }
            });
        }, function (res) {});
    }
    $scope.check = function (email) {
        for (var i = 0; i < $scope.notifications.length; i++) {
            if ($scope.notifications[i]._from == email) {
                return true;
            }
        }
        return false;
    }
});