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
        	/*return(!$scope.playlists[index]);*/
        	var removePlaylistPromise = manage.removePlaylists($scope.playlists[index]);
        	console.log(removePlaylistPromise);
        	$scope.playlists.splice(index, 1);
        }

    });