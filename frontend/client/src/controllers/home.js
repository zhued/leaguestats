angular.module('leaguestats-ui').controller('HomeController', [
  '$scope',
  '$http',

  function($scope,$http){
    $scope.formData = {}
   //  $http({
   //  method: 'GET',
   //  url: '/ghostneedle'
   // }).then(function(data){
   //  $scope.time_played = data.data;
   // });

    $scope.startDate


    $scope.list = [];
    $scope.text = "";
    $scope.submit = function() {
      console.log('hi');
      if ($scope.text) {
        var querystring = ($scope.text).toLowerCase().replace(/ /g, '');
        $http({
        method: 'GET',
        url: '/summoner/'+querystring
       }).then(function(data){
        response = data.data
        template = getTemplate();
          // console.log(template)
        for(var i=0; i<response.length; i++){
          game = response[i]
          // console.log(game)
          timePlayed = game.timePlayed
          gameEndtime = game.gameEndtime
          summonerId = game.summoner_id
          gameStartTime = gameEndtime - (timePlayed * 1000);
          // console.log(timePlayed)

          startDate = new Date(gameStartTime);
          endDate = new Date(gameEndtime)

          startDayNumber = startDate.getDay() + 1
          endDayNumber = startDate.getDay() + 1

          startHourNumber = startDate.getHours() + 1
          endHourNumber = endDate.getHours() + 1

          startKey = String(startDayNumber)+String(startHourNumber)
          endKey = String(endDayNumber)+String(endHourNumber)

          console.log(template[startKey])

          // check if the game is over an hour long
          check_game = endHourNumber - startHourNumber
          if (check_game > 1 ) {
            template[startKey].value += 0.5;
            for (var i = 1; i < check_game; i++) {
              increment = String(startHourNumber + 1)
              incrementKey = String(startDayNumber)+String(increment)
              template[incrementKey].value += 1;
            };
            template[endKey].value += 0.5;
          } else if (startHourNumber == 23 && endHourNumber == 1) { // checking for 23 to 1
            template[startKey].value += 0.5;
            template['24'].value += 1;
            template[endKey].value += 0.5;
          } else if (startHourNumber == 24 && endHourNumber == 2) { // checking for 24 to 2
            template[startKey].value += 0.5;
            template['1'].value += 1;
            template[endKey].value += 0.5;
          } else if (check_game == 0 | check_game == 1 | check_game == -23){
            template[startKey].value += 1;
            template[endKey].value += 1;
          };
        }
        $scope.time_played = template;
        // console.log(template)
       });

      }
    };
  }
])


angular.module('app').directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'DD, d  MM, yy',
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});
