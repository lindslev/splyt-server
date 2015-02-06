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
        return $http.delete('api/playlists/' + playlistobj._id, playlistobj);
      },
      getSpecificPlaylist: function(playlistobj){
        return $http.get('api/playlists/' + playlistobj._id);
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
      },
      getSong: function(song_id) {
        return $http.get('api/songs/' + song_id)

      }
    };
  });
