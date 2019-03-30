var app = angular.module('uniccan', []);
app.controller('profileCtrl', function ($scope, $http) {
    $scope.search = function () {
        var q = $("input[name='q']").val();
        $http({
            url: '/search',
            data: {
                q: q
            },
            method: 'POST',
        }).then(function (res) {
            console.log(res.data);
            $scope.helpers = res.data;
        }, function (res) {});
    }
});