var app = angular.module('uniccan', []);
app.controller('profileCtrl', function ($scope, $http) {
    $scope.btn_show = false;
    $scope.tag_disabled = true;
    $scope.data = {};
    ($scope.iniValues = function () {
        $scope.data.id = $('meta[name="user-id"]').attr('content');
        $scope.data.name = $('meta[name="user-name"]').attr('content');
        $scope.data.gender = $('meta[name="user-gender"]').attr('content');
        $scope.data.dob = new Date($('meta[name="user-dob"]').attr('content'));
        $scope.data.education = $('meta[name="user-education"]').attr('content');
        $scope.data.college_name = $('meta[name="user-college_name"]').attr('content');
        $scope.data.degrees = $('meta[name="user-degrees"]').attr('content');
        $scope.data.work_experiences = JSON.parse($('meta[name="user-work_experiences"]').attr('content') || '[]');
        $scope.data.skills = $('meta[name="user-skills"]').attr('content');
        $scope.data.hobbies = $('meta[name="user-hobbies"]').attr('content');
        $scope.data.extra_curricular_activities = $('meta[name="user-extra_curricular_activities"]').attr('content');
        $scope.data.knowledges = $('meta[name="user-knowledges"]').attr('content');
        console.log($scope.data);
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
            $('.alert').removeClass('alert-danger').addClass('alert-success').show();
            $('.alert .message').html('Profile Updated');
            for (key in $scope.data) {
                var val = $scope.data[key];
                if (key == 'work_experiences') {
                    val = JSON.stringify(val);
                }
                $(`meta[name='user-${key}']`).attr('content', val);
            }
            $scope.cancelEdit();
        }, function (res) {
            $('.alert').removeClass('alert-success').addClass('alert-danger').show();
            $('.alert .message').html(res.data.message);
        })
    }
});