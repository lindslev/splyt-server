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
            .content('Sorry, could not find them. Try another search!')
            .position(getToastPosition())
            .hideDelay(3000)
          );
        },
        createdPlaylist : function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Playlist Created!')
            .position(getToastPosition())
            .hideDelay(3000)
          );
        },
        removedPlaylist : function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Removed Playlist!')
            .position(getToastPosition())
            .hideDelay(3000)
          );
        },
        alreadySubscribed : function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Sorry, you are already subscribed to them!')
            .position(getToastPosition())
            .hideDelay(3000)
          );
        },
        removedSubscription : function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Subscription Removed!')
            .position(getToastPosition())
            .hideDelay(3000)
          );
        },
        subscribed : function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Subscribed!')
            .position(getToastPosition())
            .hideDelay(3000)
          );
        },
        removedSong : function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Song Removed!')
            .position(getToastPosition())
            .hideDelay(3000)
          );
        },
        addedSong : function() {
          $mdToast.show(
            $mdToast.simple()
              .content('Song Added!')
              .position(getToastPosition())
              .hideDelay(3000)
          );
        }
      }
});
