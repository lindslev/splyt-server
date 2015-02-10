'use strict';

angular.module('splytApp')
  .directive('player', function () {
    return {
      templateUrl: 'app/player/player.html',
      restrict: 'E',
      controller: 'PlayerCtrl'
    };
  });
