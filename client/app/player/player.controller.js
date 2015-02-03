'use strict';


angular.module('splytApp')
  .controller('PlayerCtrl', function ($scope) {

    soundManager.url = '/swfs/';
    soundManager.flashVersion = 9;
    soundManager.useFlashBlock = false;
    soundManager.useHighPerformance = true;
    soundManager.wmode = 'transparent';
    soundManager.useFastPolling = true;

    $scope.songs = [];


    soundManager.onready(function() {
      $scope.songs = [];
      var consumer_key = '7af759eb774be5664395ed9afbd09c46',
      url = "http://soundcloud.com/foofighters/sets/wasting-light";

      $.getJSON('http://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key=' + consumer_key + '&callback=?', function(playlist){
        $.each(playlist.tracks, function(index, track) {
          $scope.songs.push({
            id: 'five',
            title: track.title,
            artist: 'someone',
            url: track.stream_url + '?consumer_key=' + consumer_key
          });
          console.log($scope.songs);
        });
      });
    })

    //adding test songs
    // $scope.songs = [
    //   {
    //       id: 'one',
    //       title: 'Rain',
    //       artist: 'Drake',
    //       url: 'https://www.youtube.com/watch?v=fMxIuFMgt4U'
    //   },
    //   {
    //       id: 'two',
    //       title: 'Walking',
    //       artist: 'Nicki Minaj',
    //       url: 'https://soundcloud.com/pinkfeathers/like-you-do-ghost-beach-remix?consumer_key=7af759eb774be5664395ed9afbd09c46'
    //   },
    //   {
    //       id: 'three',
    //       title: 'Barrlping with Carl (featureblend.com)',
    //       artist: 'Akon',
    //       url: 'https://soundcloud.com/pinkfeathers/like-you-do-ghost-beach-remix?consumer_key=7af759eb774be5664395ed9afbd09c46'
    //   },
    //   {
    //       id: 'four',
    //       title: 'Angry cow sound?',
    //       artist: 'A Cow',
    //       url: 'http://api.soundcloud.com/tracks/13158665/stream?consumer_key=7af759eb774be5664395ed9afbd09c46'
    //   }
      // {
      //     id: 'five',
      //     title: 'Things that open, close and roll',
      //     artist: 'Someone',
      //     url: 'https://cf-media.sndcdn.com/1Iydbj7KnvOi.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vMUl5ZGJqN0tudk9pLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0MjI5MTIyOTl9fX1dfQ__&Signature=zeYkUqCz-otEabogO9S6Mmk0bi41LKsY3i9bLSR29f9Vf0WkhU1s89YLSRKxOEV4Oq50F6vtfLD-Z5zsOtTA3o21kHBCNnI~T2Zbz8x7AxaeWo2yaku0Po5rfs4YCP9UOmB0o9XVFsGSg7XEeRqnNrOJXf~h8wkHbu-LI0g1uuc94UpRbCEFSCEkgJsH4bPWMdGLvyZu~A76u8CgEQSiO9xb8IrYipoDeIFz2q-g3qvae3OVcImah2P0vVUPQTcMgMOEFpAaxRJK159j~MLeusH3Q0EpOl1nZSNkYCGAi7YLNgxAx0VpeNQ4oMg~uJ19w6RzhjHc-lfr~FggaHZS3w__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ'
    //   // }
    // ];
  });
