'use strict';

angular.module('splytApp')
  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
      console.log(arguments);
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider
      .state('queue', {
        url: '/queue/:playlist_id',
        templateUrl: 'app/queue/queue.html',
        controller: 'QueueCtrl',
        resolve: {
          playlist: function($stateParams, $http) {
            return $http.get('/api/playlists/' + $stateParams.playlist_id).then(function (response) {
              return response.data;
            });
          }
        }
      })
  });
