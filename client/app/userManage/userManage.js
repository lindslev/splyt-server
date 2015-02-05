'use strict';

angular.module('splytApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userManage', {
        url: '/user/:id',
        templateUrl: 'app/userManage/userManage.html',
        controller: 'UserManageCtrl'
      });


  });