'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($scope, youtube, $sanitize, $sce, manage, $log) {

  $scope.songs = [];
  $scope.playlist_tabs = [];


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
        console.log(playlists[i]);
        for (var j = 0; j < playlists[i].songs.length; j++) {
//IMPORTANT - only getting song ids right now, need to look up
//song objects later
          $scope.songs.push(playlists[i].songs[j]);
        }
      }
    }
  })




  });
