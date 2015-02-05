'use strict';

angular.module('splytApp')
  .factory('manage', function (Auth, $http) {

    // Public API here
    return {
      createPlaylist: function (playlistobj) {
        return $http.post('api/playlist' + Auth.getCurrentUser()._id, playlistobj);
      },
      getPlaylists: function () {
        return $http.get('api/users/' + Auth.getCurrentUser()._id + '/playlists');
      },
      removePlaylists: function () {
        return meaningOfLife;
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
