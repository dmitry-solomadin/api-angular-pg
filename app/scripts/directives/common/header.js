angular.module('docsSimpleDirective', [])
  .directive('pgHeader', function() {
    return {
      restrict: 'A',
      templateUrl: 'views/common/header.html'
    };
  });