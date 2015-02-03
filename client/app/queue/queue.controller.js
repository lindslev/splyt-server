'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($scope, youtube, $sanitize, $sce) {
  $scope.songs = [];


    $scope.addYoutubePlaylist = function(){
    //HARDCODED CODE
      youtube.getYoutubeVideo("zol2MJf6XNE").then(function(res){
          res.embedded = $sce.trustAsHtml(res.embed);
          $scope.songs.push(res);
       });
    }

  for (var i = 0; i < 15; i++) {
    $scope.addYoutubePlaylist();
  }

  $scope.htmlString = '<h1>Kamilla</h1>'


  });
