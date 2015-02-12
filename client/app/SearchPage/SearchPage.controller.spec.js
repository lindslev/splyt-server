'use strict';

describe('Controller: SearchPageCtrl', function () {

  // load the controller's module
  beforeEach(module('splytApp'));

  var SearchPageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchPageCtrl = $controller('SearchPageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
