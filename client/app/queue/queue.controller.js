'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($http, playlist, $scope, youtube, $sanitize, $sce, manage, $log, $stateParams, $state, QueuePlayerComm, toast) {

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

    if(document.getElementById('pButton').className == 'pause') {
      //then a song is already playing and we're coming back from a diff state
      var currently = QueuePlayerComm.giveCurrentlyPlaying();
      $scope.songs.forEach(function(s, i){
        if(s._id == currently._id) {
          $scope.songs[i] = currently; //this makes it possible to move between states and have the icon logic remain functional
        }
      })
    }

    $scope.play = function(song) {
      QueuePlayerComm.onChangeSong(song);
    }

    QueuePlayerComm.on('globalPlayerToggle', function(s) {
      s.playing == 'pause' ? s.playing = 'play_arrow' : s.playing = 'pause';
    })
});
