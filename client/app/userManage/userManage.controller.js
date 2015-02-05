'use strict';

angular.module('splytApp')
    .controller('UserManageCtrl', function($scope, Auth, manage) {

        var playlistPromise = manage.getPlaylists();





//Getting Playlists
        playlistPromise.success(function(playlists) {
            $scope.playlists = [];
            for (var i = 0; i < playlists.length; i++) {
                if (playlists[i].friend_stream === false && playlists[i].aggregate_stream === false) {
                    $scope.playlists.push(playlists[i]);
                }
            }
        });




    });