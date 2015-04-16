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
    $( "#from" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
    $scope.list = [];
    $scope.text = "";
    $scope.startDate=Date(0);
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
