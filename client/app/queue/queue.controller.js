'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($http, playlist, $scope, youtube, $sanitize, $sce, manage, $log, $stateParams, $state) {


  $scope.songs = playlist.songs;
  $scope.playlist = playlist;

  $scope.playlist_tabs=[];

  $scope.tabs = $scope.playlist_tabs;

  $scope.update_songs = function(id) {
    console.log('update_songs');
    $state.go('queue',{playlist_id: id}, true);
  }

  var player = new Audio('/api/youtubes/stream/at3FPJaAwoY')
  player.preload = 'metadata';
  player.play();
  player.controls = true;
  document.body.appendChild(player);

  var playlistPromise = manage.getPlaylists();

  //Getting playlists

  playlistPromise.success(function(playlists) {
    $scope.playlists = [];
    for (var i = 0; i < playlists.length; i++) {
      $scope.playlist_tabs.push(playlists[i]);
      if (playlists[i].aggregate_stream === true) {
        $scope.main_playlist = playlists[i];

      } if (playlists[i].friend_stream === true) {
        $scope.friend_playlist = playlists[i];
      }
    }
  }).then(function(){
    console.log($scope.playlist_tabs);
  });

});
