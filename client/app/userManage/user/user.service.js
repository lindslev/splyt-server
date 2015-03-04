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
          return $http.post('api/users/subscription/'+ Auth.getCurrentUser()._id, subscription)
      },

      //don't show users they already follow in search results
      removeCurrentFollowers: function(data, followers) {
        var result_array = data;
        data.map(function(datum) {
          for (var i = 0; i < followers.length; i ++) {
            if (datum._id === followers[i]._id) {
              result_array.splice(data.indexOf(datum), 1);
            }
          }
        });
        return result_array;
      }

    };
});
