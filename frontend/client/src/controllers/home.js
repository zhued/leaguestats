angular.module('app').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){
   //  $http({
   //  method: 'GET',
   //  url: '/ghostneedle'
   // }).then(function(data){
   //  $scope.time_played = data.data;
   // });
    $scope.list = [];
    $scope.text = "";
    $scope.submit = function() {
      if ($scope.text) {
        var querystring = ($scope.text).toLowerCase().replace(/ /g, '');
        $http({
        method: 'GET',
        url: '/summoner/'+querystring
       }).then(function(data){
        $scope.time_played = data.data;
       });
      }
    };
  }
])
