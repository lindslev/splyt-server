'use strict';

angular.module('splytApp')
    .factory('user', function($http, Auth) {

        // Public API here
        return {
        	getUsers: function(name){
        		return $http.get('api/users/name/' + name);
        	},
            getFollowers: function() {
                return meaningOfLife;
            },
            getSubscriptions: function() {
                return meaningOfLife;
            },
            setSubscription: function(user) {
                return $http.post('api/users/' + Auth.getCurrentUser()._id, user);
            },
            removeSubscription: function() {
                return meaningOfLife;
            }
        };
    });