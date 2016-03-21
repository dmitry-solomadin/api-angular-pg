// Declare app level module which depends on views, and components
angular.module('angularPg', ['angularPg.directives', 'ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: '/views/sign_up/sign-up.html'
      }).
      when('/sign-up', {
        templateUrl: '/views/sign_up/sign-up.html'
      });
  });
