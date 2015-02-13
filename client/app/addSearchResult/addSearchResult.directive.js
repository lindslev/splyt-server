'use strict';

angular.module('splytApp')
  .directive('addSearchResult', function () {
    return {
      templateUrl: 'app/addSearchResult/addSearchResult.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });