angular.module('app').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){
    $http({
    method: 'GET',
    url: '/ghostneedle'
   }).then(function(data){
    $scope.sent = data.data;
   });
  }
]);



