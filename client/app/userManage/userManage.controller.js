'use strict';

angular.module('splytApp')
    .controller('UserManageCtrl', function($scope, Auth, manage, user, toast, $log) {
      $scope.nameFilter = {
        name: ''
      }
      //Tabs functionality

        //Getting Playlists
        var getPlaylistPromise = manage.getPlaylists();

        getPlaylistPromise.success(function(playlists) {
            $scope.playlists = [];
            for (var i = 0; i < playlists.length; i++) {
                if (playlists[i].friend_stream === false) {
                    $scope.playlists.push(playlists[i]);
                } else if (playlists[i].friend_stream === true) {
                }
            }
        });
        //Get Followers and Subscriptions
        var getFollowersandSubscriptionsPromise = user.getFollowersandSubscriptions();

        getFollowersandSubscriptionsPromise.success(function(user) {
                $scope.currentUserSubscriptions = user.subscriptions;
                $scope.currentUserFollowers = user.followers;
            })
            //Gets users

        $scope.getUsers = function(selectedUser) {
            var getUsersPromise = user.getUsers(selectedUser)
            getUsersPromise.success(function(data) {
                if (data.length === 0) {
                    toast.showNoUsers();
                } else {
                    $scope.userList = data;
                    var index = $scope.userList.map(function(x) {return x._id; }).indexOf(Auth.getCurrentUser()._id);
                    if(index != -1){
                        $scope.userList.splice(index, 1);
                        if($scope.userList.length === 0){
                            toast.showNoUsers();
                        }
                    }
                }
                $scope.nameFilter.name = '';
            })

        }


        //Get Specific Playlist
        $scope.getSpecificPlaylist = function(index) {
            $scope.currentPlaylist = $scope.playlists[index];
            var getSpecificPlaylistPromise = manage.getSpecificPlaylist($scope.playlists[index]);
            getSpecificPlaylistPromise.success(function(onePlaylist) {
                $scope.currentPlaylistSongs = onePlaylist.songs;
            })
        }


        //Create Playlist
        $scope.newPlaylist = {
            title : ''
        };

        $scope.createPlaylist = function() {
            var createPlaylistPromise = manage.createPlaylist($scope.newPlaylist);
            createPlaylistPromise.success(function(playlist) {
                $scope.playlists.push(playlist);
                $scope.newPlaylist.title = '';
                toast.createdPlaylist();
            })
        }

        //Delete Playlist
        $scope.removePlaylist = function(index) {
            var removePlaylistPromise = manage.removePlaylists($scope.playlists[index]);
            $scope.playlists.splice(index, 1);
            toast.removedPlaylist();
        }


        //Subscribe
        $scope.subscribe = function(index) {
            if ($scope.currentUserSubscriptions.map(function(x) {return x._id; }).indexOf($scope.userList[index]._id) === -1) {
                var subscribePromise = user.setSubscription($scope.userList[index]);
                subscribePromise.success(function(subscription) {
                    $scope.currentUserSubscriptions.push($scope.userList[index]);
                    toast.subscribed();
                    $scope.userList = null;
                    $scope.nameFilter.name = '';
                })
            } else {
                toast.alreadySubscribed();
                $scope.userList = null;
            }
        }

        //Remove subscriptions
        $scope.removeSubscription = function(index) {
            var removeSubscriptionPromise = user.removeSubscription($scope.currentUserSubscriptions[index]);
            $scope.currentUserSubscriptions.splice(index, 1);
            toast.removedSubscription();
        }

        //Get specific User
        $scope.getSpecificUser = function(index) {

        }
        //Remove Song from Playlist
        $scope.removeSongfromPlaylist = function(index) {
            var removeSongfromPlaylistPromise = manage.removeSongfromPlaylist($scope.currentPlaylist, $scope.currentPlaylistSongs[index]);
            $scope.currentPlaylistSongs.splice(index, 1);
        }
    });
