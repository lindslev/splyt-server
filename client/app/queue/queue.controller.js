'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($scope, youtube, $sanitize, $sce, manage, $log) {

  $scope.songs = [

  ];
  $scope.playlist_tabs = [];
  $scope.friend_songs = [];

  var tabs = [
    {title: 'Main', id:'1', content: 'content 1' },
    {title: 'Friends\' Music', id:'2', content: 'content 2'}
  ];

  $scope.tabs = tabs;
  $scope.update_songs = function(id) {
    console.log(id);
  }

    $scope.addYoutubePlaylist = function(){
    //HARDCODED CODE

          $scope.songs.push({
            title:'random song',
            artist: 'random artist',
            source:'my source'
          });

    }

  for (var i = 0; i < 15; i++) {
    $scope.addYoutubePlaylist();
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
  });

  // for (var j = 0; j < playlists[i].songs.length; j++) {
  //   var songPromise = manage.getSong(playlists[i].songs[j]);
  //   songPromise.success(function(song) {
  //     $scope.songs.push(song);
  //   })
  // }

  // for (var j = 0; j < playlists[i].songs.length; j++) {
  //   var songPromise = manage.getSong(playlists[i].songs[j]);
  //   songPromise.success(function(song) {
  //     $scope.songs.push(song);
  //   });
  // }




  });
