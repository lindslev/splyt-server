'use strict';

angular.module('splytApp')
  .factory('toast', function ($mdToast) {
    // Service logic
    // ...
        var toastPosition = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        var getToastPosition = function() {
            return Object.keys(toastPosition)
            .filter(function(pos) { return toastPosition[pos]; })
            .join(' ');
        };

    // Public API here
    return {
      showNoUsers : function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Sorry, Did not find them. Try Again!')
            .position(getToastPosition())
            .hideDelay(3000)
          );
        }
      }
});
