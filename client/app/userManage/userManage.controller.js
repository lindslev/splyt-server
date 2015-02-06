'use strict';

angular.module('splytApp')
    .controller('UserManageCtrl', function($scope, Auth, manage) {

		//Getting Playlists
        var getPlaylistPromise = manage.getPlaylists();

        getPlaylistPromise.success(function(playlists) {
            $scope.playlists = [];
            for (var i = 0; i < playlists.length; i++) {
                if (playlists[i].friend_stream === false) {
                    $scope.playlists.push(playlists[i]);
                }
            }
        });

        //Get Specific Playlist
        $scope.getSpecificPlaylist = function(index){
            var getSpecificPlaylistPromise = manage.getSpecificPlaylist($scope.playlists[index]);
            getSpecificPlaylistPromise.success(function(onePlaylist){
                $scope.songs = onePlaylist.songs;
            })
        }

        //Create Playlist
        $scope.newPlaylist = {};

        $scope.createPlaylist = function() {
			var createPlaylistPromise = manage.createPlaylist($scope.newPlaylist);
			createPlaylistPromise.success(function(playlist){
				$scope.playlists.push(playlist);
			})
        }

        //Delete Playlist
        $scope.removePlaylist = function(index){
        	var removePlaylistPromise = manage.removePlaylists($scope.playlists[index]);
        	$scope.playlists.splice(index, 1);
        }

    });