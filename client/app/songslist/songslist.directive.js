'use strict';

angular.module('splytApp')
  .directive('songslist', function () {
    return {
      templateUrl: 'app/songslist/songslist.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });