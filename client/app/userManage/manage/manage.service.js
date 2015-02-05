'use strict';

angular.module('splytApp')
  .factory('manage', function (Auth, $http) {

    // Public API here
    return {
      createPlaylist: function () {
        return meaningOfLife;
      },
      getPlaylists: function () {
        console.log('user', Auth.getCurrentUser());
        return $http.get('api/users/' + Auth.getCurrentUser()._id + '/playlists').success(function(data){
          console.log('request', data);
          return data;
        })
      },
      getFollowers: function () {
        return meaningOfLife;
      },
      getSubscriptions: function () {
        return meaningOfLife;
      },
      setSubscription: function () {
        return meaningOfLife;
      },
      removeSubscription: function () {
        return meaningOfLife;
      }
    };
  });
