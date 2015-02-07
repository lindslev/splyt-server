'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($http, playlist, $scope, youtube, $sanitize, $sce, manage, $log, $stateParams, $state) {


  $scope.songs = playlist.songs;

  $scope.play = function(song) {
    console.log('kamilla pls', song)
  }

  $scope.playlist = playlist;

  $scope.playlist_tabs=[];

  $scope.tabs = $scope.playlist_tabs;

  $scope.update_songs = function(id) {
    console.log('update_songs');
    $state.go('queue',{playlist_id: id}, true);
  }

  // var player = new Audio('/api/youtubes/stream/at3FPJaAwoY')
  // player.preload = 'metadata';
  // player.play();
  // player.controls = true;
  // document.body.appendChild(player);

  // var player = new Audio('/api/youtubes/stream/at3FPJaAwoY')
  // player.preload = 'metadata';
  // player.play();
  // player.controls = true;
  // document.body.appendChild(player);
  SC.get("/tracks/182687718", {}, function(sound, error) {
    $('#scplayer').attr('src', sound.stream_url + '?client_id=7af759eb774be5664395ed9afbd09c46');
  });

  var player2 = new Audio('https://www.tumblr.com/audio_file/uncaught/101386977846/tumblr_ne5ykbG3y11qflbpe?play_key=e6ba8f023e92bbb5aaf06052cd0c6551&tumblelog=uncaught&post_id=101386977846')
  player2.preload = 'metadata';
  player2.play();
  player2.controls = true;
  document.body.appendChild(player2);

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
