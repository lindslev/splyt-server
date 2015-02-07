'use strict';

angular.module('splytApp')
    .factory('user', function($http, Auth) {

        // Public API here
        return {
        	getUsers: function(name){
        		return $http.get('api/users/name/' + name);
        	},
            getFollowersandSubscriptions: function() {
                return $http.get('api/users/social/' + Auth.getCurrentUser()._id);
            },
            setSubscription: function(user) {
                return $http.post('api/users/' + Auth.getCurrentUser()._id, user);
            },
            removeSubscription: function(subscription) {
                console.log('user.service', subscription);
                return $http.post('api/users/subscription/'+ Auth.getCurrentUser()._id, subscription)
            }
        };
    });