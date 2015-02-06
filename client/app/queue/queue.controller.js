'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($scope, youtube, $sanitize, $sce, manage, $log) {

  $scope.songs = [];
  $scope.playlist_tabs = [];
  $scope.friend_songs = [];

  var tabs = [
    {title: 'Main', songs: $scope.songs },
    {title: 'Friends\' Music', songs:$scope.friend_songs}
  ];

  $scope.tabs = tabs;

    // $scope.addYoutubePlaylist = function(){
    // //HARDCODED CODE
    //   youtube.getYoutubeVideo("zol2MJf6XNE").then(function(res){
    //       res.embedded = $sce.trustAsHtml(res.embed);
    //       $scope.songs.push(res);
    //    });
    // }

  // for (var i = 0; i < 15; i++) {
  //   $scope.addYoutubePlaylist();
  // }

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

  for (var j = 0; j < playlists[i].songs.length; j++) {
    var songPromise = manage.getSong(playlists[i].songs[j]);
    songPromise.success(function(song) {
      $scope.songs.push(song);
    })
  }

  for (var j = 0; j < playlists[i].songs.length; j++) {
    var songPromise = manage.getSong(playlists[i].songs[j]);
    songPromise.success(function(song) {
      $scope.songs.push(song);
    });
  }




  });
