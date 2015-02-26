'use strict';

angular.module('splytApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $sanitize, $sce, $modal, LogoutFactory) {
    var ext_id = "dekmhppoomofnjclcollpbdknpldlgnd";

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      if(chrome.runtime) {
        chrome.runtime.sendMessage(ext_id, { action: 'LOGOUT', method: '', user: $scope.currentUser },
         function(response) {
             cb(response);
         });
      }
      Auth.logout();
      LogoutFactory.trigger('userLogout');
      $location.path('/login');
    };

    $scope.open = function(){
      var modalInstance = $modal.open({
        templateUrl: 'app/SearchPage/SearchPage.html',
        controller: 'SearchPageCtrl',
        size: 'lg'
      });
    }

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
