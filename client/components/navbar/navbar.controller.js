'use strict';

angular.module('splytApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    var ext_id = "fccjgnomcnlfiedbadofibbhilpbdjpl";

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

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
