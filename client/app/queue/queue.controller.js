'use strict';

angular.module('splytApp')

  .controller('QueueCtrl', function ($http, socket, Auth, playlist, $scope, youtube, $sanitize, manage, $log, $stateParams, $state, QueuePlayerComm, toast, $mdDialog, $modal, $window, selectedIndex) {

    //youtube iframe api include
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    ///

    var currentUser = Auth.getCurrentUser();

    $scope.media_width = $window.innerWidth;


    $scope.selectedIndex = selectedIndex.myNum;

    //function to access media width for responsiveness
    $scope.$watch(function(){
       return $window.innerWidth;
    }, function(value) {
       $scope.media_width = value;
       console.log(value);
   });

    $scope.updateIndex = function(index) {
      selectedIndex.myNum = index;
    }

    socket.socket.on('newSong', function(data){
      if(data.user == currentUser._id) {
        if(playlist._id == data.playlist) {
          data.song.playing = 'play_arrow';
          $scope.songs.push(data.song);
        }
      } else if(subscribedTo(data.user)) {
        toast.friendAddedSong(data.song);
      }
    })

    function subscribedTo(user) {
      return currentUser.subscriptions.indexOf(user) > -1;
    }

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


//PLAYLISTS

    var playlistPromise = manage.getPlaylists();

    //Getting playlists
    playlistPromise.success(function(playlists) {
      $scope.playlists = [];
      for (var i = 0; i < playlists.length; i++) {
        $scope.playlist_tabs.push(playlists[i]);
      }
    }).then(function(){
      $scope.user_playlists = $scope.playlist_tabs.slice(3);
      $scope.user_playlists = dropdown($scope.user_playlists, playlist._id);
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

    var dropdown = function (arr, id){
      var index = arr.map(function(x) {return x._id; }).indexOf(id);
      if (index != -1){
        arr.splice(index, 1)
        return arr;
      }
      else{
        return arr;
      }
    }

//DIALOGS

    $scope.open = function(){
      var modalInstance = $modal.open({
        templateUrl: '/app/SearchPage/SearchPage.html',
        controller: 'SearchPageCtrl',
        size: 'lg'
      });
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


//PLAYER CONFIG

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

//SIDEBAR

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

    //DRAG N DROP
    $scope.dragControlListeners = {
      accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope._id === destSortableScope._id;
      },
      itemMoved: function (event) {
      },
      orderChanged: function(event) {
        var new_list = [];
        for (var i = 0; i < $scope.songs.length; i++) {
          new_list.push($scope.songs[i]._id);
        }
        $http.put('/api/playlists/listchange/' +  $scope.playlist._id, new_list).success(function(err, data) {
          if(err) console.log(err);
        })
      }
    };


});
