'use strict';

angular.module('splytApp')
    .factory('manage', function(Auth, $http) {
        return {
            createPlaylist: function(playlistobj) {
                return $http.post('api/playlists/user/' + Auth.getCurrentUser()._id, playlistobj);
            },
            getPlaylists: function() {
                return $http.get('api/users/' + Auth.getCurrentUser()._id + '/playlists');
            },
            removePlaylists: function(playlistobj) {
                return $http.delete('api/playlists/' + playlistobj._id, playlistobj);
            },
            getSpecificPlaylist: function(playlistobj) {
                return $http.get('api/playlists/' + playlistobj._id);
            },
            removeSongfromPlaylist: function(playlistobj, songobj){
                return $http.delete('api/playlists/' + playlistobj._id + '/song/'+ songobj._id);
            }
        };
    });

