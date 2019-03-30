var templateContent = document.querySelector('#skill-set').content;
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
    $scope.filter = function () {
        $('#skills').html('');
        var q = $scope.q.trim();
        if (!q.length) {
            return;
        }
        var inputVal = new RegExp(q, 'i');
        var set = Array.prototype.reduce.call(templateContent.cloneNode(true).children, function searchFilter(frag, item, i) {
            if (inputVal.test(item.textContent) && frag.children.length < 6) frag.appendChild(item);
            return frag;
        }, document.createDocumentFragment());
        console.log(set);
        $('#skills').append(set);
    }
});