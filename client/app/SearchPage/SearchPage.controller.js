'use strict';

angular.module('splytApp')
  .controller('SearchPageCtrl', function ($scope, search, manage) {
    $scope.SCResults;
    $scope.YTResults;
    $scope.SC = false;
    $scope.YT = false;
    $scope.playlist_tabs = [];
    var playlistPromise = manage.getPlaylists();

    playlistPromise.success(function(playlists) {
      $scope.playlists = [];
      for (var i = 0; i < playlists.length; i++) {
        if (i !== 1) {
          $scope.playlist_tabs.push(playlists[i]);
        }
      }
    });


      //search bar stuff.
  $scope.searchSC = function(query) {
    search.searchSC(query, function(data) {
      $scope.SCResults = data;
      $scope.SC = true;
    });
  }

  $scope.searchYT = function(query) {
    search.searchYT(query, function(data) {
      $scope.YTResults = data.items;
      $scope.YT = true;
    });
  }

  $scope.addYTSong = function(playlist, song) {
    search.addYT(song, playlist, function(data) {
      console.log(data);
    });
  }

  console.log($scope.SCResults);
});
