'use strict';

angular.module('splytApp')
  .controller('UserManageCtrl', function ($scope, Auth, manage) {
    $scope.message = 'Hello';

    manage.getPlaylists().success(function(playlist){
    	$scope.playlists = playlist;
    });
    console.log('playlist frontend', $scope.playlists);
  });
