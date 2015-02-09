'use strict';

angular.module('splytApp')
    .controller('UserManageCtrl', function($scope, Auth, manage, user) {

        //Getting Playlists
        var getPlaylistPromise = manage.getPlaylists();

        getPlaylistPromise.success(function(playlists) {
            $scope.playlists = [];
            for (var i = 0; i < playlists.length; i++) {
                if (playlists[i].friend_stream === false) {
                    $scope.playlists.push(playlists[i]);


                } else if (playlists[i].friend_stream === true) {
                  console.log(playlists[i]);
                }
            }
        });
        //Get Followers and Subscriptions
        var getFollowersandSubscriptionsPromise = user.getFollowersandSubscriptions();

        getFollowersandSubscriptionsPromise.success(function(user){
            $scope.currentUserSubscriptions = user.subscriptions;
            $scope.currentUserFollowers = user.followers;
        })
        //Gets users

        $scope.getUsers = function(selectedUser){
            var getUsersPromise = user.getUsers(selectedUser)
            getUsersPromise.success(function(data){
                if(!data){console.log("no users")}
                    else{
                        $scope.userList = data;
                    }
            })
        }

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


        //Subscribe
        $scope.subscribe = function(index){
            if($scope.currentUserSubscriptions.indexOf($scope.userList[index]) === -1){
                var subscribePromise = user.setSubscription($scope.userList[index]);
                subscribePromise.success(function(subscription){
                    $scope.currentUserSubscriptions.push($scope.userList[index]);
                })
            }
            else{
                console.log('already subscribed');
            }
        }

        //Remove subscriptions
        $scope.removeSubscription = function(index){
            console.log('front end', $scope.currentUserSubscriptions[index])
            var removeSubscriptionPromise = user.removeSubscription($scope.currentUserSubscriptions[index]);
            $scope.currentUserSubscriptions.splice(index, 1);
        }

        //Get specific User
        $scope.getSpecificUser = function(index){

        }



        console.log(Auth.getCurrentUser()._id);



















    });
