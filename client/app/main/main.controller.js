'use strict';

angular.module('splytApp')
  .controller('MainCtrl', function ($scope, $http, socket, youtube) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    
    $scope.addYoutubePlaylist = function(){
      //HARDCODED CODE
        youtube.getYoutubeVideo("zol2MJf6XNE").then(function(res){
            console.log('addYoutubePlaylist', res);
         });
    }
 
    

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
