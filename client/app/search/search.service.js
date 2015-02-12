'use strict';

angular.module('splytApp')
  .factory('search', function ($http) {
    //GOOGLE YOUTUBE API AUTH CODE//

    // Public API here
    return {

      searchSC: function (query, cb) {
          SC.get('/tracks', {q: query }, function(data) {
            cb(data)
          });
      },

      searchYT: function(query, cb) {
        $http.get('/api/youtubes/search/videos/' + query).success(function(data){
            cb(data);
        })
      }

    }
  });
