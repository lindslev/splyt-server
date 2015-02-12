'use strict';

angular.module('splytApp')
  .controller('SearchPageCtrl', function ($scope, search, manage, Auth) {
    $scope.SCResults;
    $scope.YTResults;
    $scope.playlist_tabs = [];

    var playlistPromise = manage.getPlaylists();
    playlistPromise.success(function(playlists) {
      $scope.playlists = [];
      for (var i = 0; i < playlists.length; i++) {
        console.log(i + ' is' + playlists[i].title);
        if (i !== 1 && i !== 2) {
          $scope.playlist_tabs.push(playlists[i]);
        }
      }
    });


      //search bar stuff.
  $scope.searchSC = function(query) {
    $scope.YTResults = null;
    search.searchSC(query, function(data) {
      $scope.SCResults = data;
      $scope.search.SCquery= "";
      $scope.$apply();
    });
  }

  $scope.searchYT = function(query) {
    $scope.SCResults = null;
    search.searchYT(query, function(data) {
      $scope.YTResults = data.items;
      $scope.search.YTquery= "";
    });
  }

  $scope.addYTSong = function(playlist, song) {
    search.addYT(song, playlist, function(data) {
      console.log(data);
    });
  }

  $scope.addSCSong = function(playlist, song) {
    search.addSC(song, playlist, function(data) {
      console.log(data);
    });
  }
  console.log($scope.SCResults);
});
