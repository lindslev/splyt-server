'use strict';

angular.module('splytApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('queue', {
        url: '/queue',
        templateUrl: 'app/queue/queue.html',
        controller: 'QueueCtrl'
      });
  });
