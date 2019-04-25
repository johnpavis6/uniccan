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
    $scope.getSuggestions = function () {
        console.log("in suggestion")
        $http({
            url: '/getSuggestionsName',
            method: 'GET',
        }).then(function (res) {
            console.log(res.data);
            $scope.names = res.data;
        }, function (res) {});

        $http({
            url: '/getSuggestionsWorkexp',
            method: 'GET',
        }).then(function (res) {
            $scope.work_exps = [];
            for(i=0;i<res.data.length;i++){
                var t = JSON.parse(res.data[i].value);
                if(t == null){
                    continue;
                }
                for(j=0;j<t.length;j++){
                    $scope.work_exps.push(t[j].company_name);
                }
            }
        }, function (res) {});

        $http({
            url: '/getSuggestionsOthers',
            method: 'GET',
        }).then(function (res) {
            $scope.others = [];
            for(i=0;i<res.data.length;i++){
                var temp = res.data[i].value;
                if(temp == null)
                continue;
                temp = temp.split(',');
                // console.log(temp);
                for(key in temp){
                    console.log(temp[key]);
                    $scope.others.push(temp[key]);
                }
                
            }
            console.log($scope.others);
        }, function (res) {});

    }
   
});