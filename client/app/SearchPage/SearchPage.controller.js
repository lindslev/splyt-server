'use strict';

angular.module('splytApp')
  .controller('SearchPageCtrl', function ($scope, search) {
    $scope.SCResults;
    $scope.YTResults;
      //search bar stuff.
  $scope.searchSC = function(query) {
    search.searchSC(query, function(data) {
      console.log(data);
      $scope.SCResults = data;
    });
  }

  $scope.searchYT = function(query) {
    search.searchYT(query, function(data) {
      console.log('getting called');
      $scope.YTResults = data.items;
      console.log(data);
    });
  }

  console.log($scope.SCResults);
});
