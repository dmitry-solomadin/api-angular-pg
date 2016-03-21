angular.module('angularPg.directives', [])
  .directive('pgHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/common/header.html'
    };
  });