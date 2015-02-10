'use strict';

angular.module('splytApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $sanitize, $sce) {
    var ext_id = "fccjgnomcnlfiedbadofibbhilpbdjpl";

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user_default_playlist = Auth.getCurrentUser().playlist[0];

    $scope.logout = function() {
      chrome.runtime.sendMessage(ext_id, { action: 'LOGOUT', method: '', user: $scope.currentUser },
       function(response) {
           cb(response);
       });
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
