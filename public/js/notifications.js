var app = angular.module('uniccan', []);
app.controller('notificationsCtrl', function ($scope, $http) {
    $scope.notifications = [];
    ($scope.mynotifications = function () {
        $http({
            url: '/mynotifications',
            method: 'GET',
        }).then(function (res) {
            console.log(res.data);
            $scope.notifications = res.data;
        }, function (res) {});
    })();
});