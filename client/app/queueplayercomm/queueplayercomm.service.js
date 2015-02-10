'use strict';

angular.module('splytApp')
  .factory('QueuePlayerComm', function () {

    return {
      onChangeSong: function (song) {
        return song;
      }
    };
  });
