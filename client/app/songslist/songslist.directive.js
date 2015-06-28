'use strict';

angular.module('splytApp')
  .directive('songslist', function () {
    return {
      templateUrl: 'app/songslist/songslist.html',
      restrict: 'E',
      controller: function($scope, manage) {

        $scope.playlist_name = angular.copy($scope.playlist.title);

        $scope.change = function(name) {
          if (name != $scope.playlist_name) {
            return manage.changePlaylistName($scope.playlist._id, name);
          }
        }
      }
    };
  });
