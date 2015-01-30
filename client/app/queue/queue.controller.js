'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($scope, youtube) {
  $scope.songs = [];


    $scope.addYoutubePlaylist = function(){
    //HARDCODED CODE
      youtube.getYoutubeVideo("zol2MJf6XNE").then(function(res){
          $scope.songs.push(res);
       });
    }

  for (var i = 0; i < 15; i++) {
    $scope.addYoutubePlaylist();
  }


  });
