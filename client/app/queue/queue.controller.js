'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($http, playlist, $scope, youtube, $sanitize, $sce, manage, $log, $stateParams, $state, QueuePlayerComm) {

    ////////////////////////
    //*********************
    //WHEN YOU GET TO THE QUEUE FROM CHANGING STATES,
    //NEED TO CHECK IF A SONG IN THE PLAYLIST IS ALREADY PLAYING
    //IN THE PLAYER AND SET IT TO PLAYING
    //*********************
    ////////////////////////


    //youtube iframe api include
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    ///

    $scope.playlist = playlist;
    $scope.playlist_tabs=[];
    $scope.tabs = $scope.playlist_tabs;

    //Updating playlist songs when user clicks on new tab
    $scope.update_songs = function(id) {
      console.log('update_songs');
      $state.go('queue', { playlist_id: id }, true);
    }

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

    $scope.songs = playlist.songs.map(function(song) { song.playing = 'play_arrow'; return song; });

    console.log($scope.songs)

    $scope.play = function(song) {
      var currentlyPlaying = QueuePlayerComm.onChangeSong(song);
      if(currentlyPlaying == song) { //if you just pressed the song currently playing
        // song.playing == 'pause' ? song.playing = 'play_arrow' : song.playing = 'pause';
      } else { //just pressed another song to start playing
        //currentlyplaying should become play_Arrow & song should become
        // currentlyPlaying.playing = 'play_arrow';
        // song.playing = 'pause';
      }
    }

    QueuePlayerComm.on('globalPlayerToggle', function(song) {
      song.playing == 'pause' ? song.playing = 'play_arrow' : song.playing = 'pause';
    })
});
