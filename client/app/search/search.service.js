'use strict';

angular.module('splytApp')
  .factory('search', function () {
    var meaningOfLife = 42;

    // Public API here
    return {
      searchSC: function (query) {
        console.log('searching Sound Cloud');
          SC.get('/tracks', {q: query }, function(data) {
            console.log(data);
          });
      }
    };
  });
