var app = angular.module('uniccan', []);
app.controller('profileCtrl', function ($scope, $http) {
    $scope.btn_show = false;
    $scope.tag_disabled = true;
    $scope.data = {};
    ($scope.iniValues = function () {
        $scope.data.id = $('meta[name="id"]').attr('content');
        $scope.data.name = $('meta[name="name"]').attr('content');
        $scope.data.gender = $('meta[name="gender"]').attr('content');
        $scope.data.dob = new Date($('meta[name="dob"]').attr('content'));
        $scope.data.education = $('meta[name="education"]').attr('content');
        $scope.data.skills = JSON.parse($('meta[name="skills"]').attr('content') || '[]');
        $scope.data.hobbies = JSON.parse($('meta[name="hobbies"]').attr('content') || '[]');
        $scope.data.extra_curricular_activities = JSON.parse($('meta[name="extra_curricular_activities"]').attr('content') || '[]');
    })();
    $scope.editDetails = function () {
        $scope.btn_show = true;
        $scope.tag_disabled = false;
    }
    $scope.cancelEdit = function () {
        $scope.btn_show = false;
        $scope.tag_disabled = true;
        $scope.iniValues();
    }
    $scope.inc = function (attr) {
        console.log(attr)
        var arr = $scope.data[attr] || [];
        arr.push('');
        $scope.data[attr] = arr;
    }
    $scope.dec = function (attr, ind) {
        var arr = $scope.data[attr];
        arr.splice(ind, 1);
        console.log(arr);
        $scope.data[attr] = arr;
    }
    $scope.submitForm = function () {
        console.log($scope.data)
        $http({
            url: '/update-profile',
            data: $scope.data,
            method: 'post',
        }).then(function (res) {
            for (key in $scope.data) {
                var val = $scope.data[key];
                if (['skills', 'hobbies', 'extra_curricular_activities'].includes(key)) {
                    val = JSON.stringify(val);
                }
                $(`meta[name='${key}']`).attr('content', val);
            }
            $scope.cancelEdit();
        }, function (res) {})
    }
});