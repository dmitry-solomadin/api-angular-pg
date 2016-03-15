angular.module('angularPg', [])
  .directive('pgHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/common/header.html'
    };
  });