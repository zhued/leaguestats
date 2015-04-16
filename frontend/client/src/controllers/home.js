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
        // $scope.list.push(this.text);
        // $scope.text = '';
        $http({
        method: 'GET',
        url: '/summoner/'+$scope.text
       }).then(function(data){
        $scope.time_played = data.data;
       });
      }
    };
  }
])
