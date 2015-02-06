'use strict';

angular.module('splytApp')
  .factory('manage', function (Auth, $http) {

    // Public API here
    return {
      createPlaylist: function (playlistobj) {
        return $http.post('api/playlists/user/' + Auth.getCurrentUser()._id, playlistobj);
      },
      getPlaylists: function () {
        return $http.get('api/users/' + Auth.getCurrentUser()._id + '/playlists');
      },
      removePlaylists: function (playlistobj) {
        return $http.delete('api/playlists/' + playlistobj._id, playlistobj, function(err, data){
          console.log('stuff', arguments);
        })
      },
      getSpecificPlaylist: function(playlistobj){
        return $http.get('api/playlists/' + playlistobj._id)
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
