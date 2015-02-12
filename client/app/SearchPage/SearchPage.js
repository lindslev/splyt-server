'use strict';

angular.module('splytApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('SearchPage', {
        url: '/search',
        templateUrl: 'app/SearchPage/SearchPage.html',
        controller: 'SearchPageCtrl'
      });


  });
