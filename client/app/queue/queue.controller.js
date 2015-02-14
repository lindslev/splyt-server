'use strict';

angular.module('splytApp')

  .controller('QueueCtrl', function ($http, socket, Auth, playlist, $scope, youtube, $sanitize, manage, $log, $stateParams, $state, QueuePlayerComm, toast, $mdDialog) {

    //youtube iframe api include
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    ///

    var currentUser = Auth.getCurrentUser();
    console.log('currentUser followers', currentUser)

    socket.socket.on('newSong', function(data){
      if(data.user == currentUser._id) {
        if(playlist._id == data.playlist) {
          data.song.playing = 'play_arrow';
          $scope.songs.push(data.song);
        }
      }
    })

    $scope.playlist = playlist;
    $scope.playlist_tabs=[];
    $scope.tabs = $scope.playlist_tabs;
    $scope.songs = playlist.songs;

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
      QueuePlayerComm.trigger('songDeletion', $scope.songs[index]);
      var removeSongfromPlaylistPromise = manage.removeSongfromPlaylist(playlist, $scope.songs[index]);
      $scope.songs.splice(index, 1);
      toast.removedSong();
    }

    $scope.showConfirm = function(ev, index) {
    var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this song?')
        .ok('Absolutely')
        .cancel('No, Of course not!')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.removeSongfromPlaylist(index)
      }, function() {
      });
    };

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

    QueuePlayerComm.on('globalPlayerToggle', function(song) {
      song.playing == 'pause' ? song.playing = 'play_arrow' : song.playing = 'pause';
    });

    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle()
                        .then(function(){
                            $log.debug("toggle left is done");
                        });
    };
    $scope.toggleRight = function() {
      $mdSidenav('right').toggle()
                          .then(function(){
                            $log.debug("toggle RIGHT is done");
                          });
    };

    $scope.close = function() {
      $mdSidenav('left').close()
                        .then(function(){
                          $log.debug("close LEFT is done");
                        });
    };

    $scope.close = function() {
      $mdSidenav('right').close()
    };

});


