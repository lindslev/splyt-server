'use strict';

angular.module('splytApp')
  .value('loggedInOnce', { flag: false })
  .controller('MainCtrl', function ($state, $scope, $http, socket, youtube, Auth, $sanitize, $sce, loggedInOnce) {
    var ext_id = "dekmhppoomofnjclcollpbdknpldlgnd";

    $scope.currentUser = Auth.getCurrentUser();
    $scope.user = {
      status : Auth.isLoggedIn()
    }

    function cb(res) { console.log('Message sent!', res) }
    if(Auth.isLoggedIn()) {
      var token = Auth.getToken();
      if(chrome.runtime) {
        chrome.runtime.sendMessage(ext_id, { action: 'LOGIN', method: '', user: $scope.currentUser, token: token },
         function(response) {
             cb(response);
         });
      }
      if(!loggedInOnce.flag) {
        loggedInOnce.flag = true;
        $state.go('queue', { playlist_id: $scope.currentUser.playlist[0] })
      }
    }

     $scope.open = function(){
      var modalInstance = $modal.open({
        templateUrl: '/app/SearchPage/SearchPage.html',
        controller: 'SearchPageCtrl',
        size: 'lg'
      });
    }
  });
