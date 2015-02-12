'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($http, playlist, $scope, youtube, $sanitize, $sce, manage, $log, $stateParams, $state, QueuePlayerComm, toast) {

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

    $scope.isActive = function(id){
      if($stateParams.playlist_id === id){
        return true;
      }
      else{return false};
    }

    var playlistPromise = manage.getPlaylists();

    //Getting playlists
    playlistPromise.success(function(playlists) {
      $scope.playlists = [];
      for (var i = 0; i < playlists.length; i++) {
        $scope.playlist_tabs.push(playlists[i]);
      }
    }).then(function(){
      console.log($scope.playlist_tabs);
      $scope.user_playlists = $scope.playlist_tabs.slice(3);
    });

    $scope.add_to_playlist = function(playlistid, songid) {
      manage.addSongtoPlaylist(playlistid, songid);
      toast.addedSong();
    }


    $scope.removeSongfromPlaylist = function(index){
      var removeSongfromPlaylistPromise = manage.removeSongfromPlaylist(playlist, $scope.songs[index]);
      $scope.songs.splice(index, 1);
      toast.removedSong();
    }

    $scope.songs = playlist.songs.map(function(song) { song.playing = 'play_arrow'; return song; });
    QueuePlayerComm.getSongsFromQueue($scope.songs);

    console.log($scope.songs)

    $scope.play = function(song) {
      var currentlyPlaying = QueuePlayerComm.onChangeSong(song);
    }

    QueuePlayerComm.on('globalPlayerToggle', function(song) {
      song.playing == 'pause' ? song.playing = 'play_arrow' : song.playing = 'pause';
    })
});
