angular.module('app').config([
  '$stateProvider',
  '$locationProvider',

  function($stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController as controller',
        templateUrl: '/home.html'
      })

}]);