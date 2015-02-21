'use strict';

angular.module('splytApp')
  .factory('LogoutFactory', function () {
    var events = {}

    return {
      on: function(eventStr, fxn) {
        events[eventStr] = fxn;
      },
      trigger: function(eventStr, data) {
        events[eventStr](data);
      }
    }
  });
