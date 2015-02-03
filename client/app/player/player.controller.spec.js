'use strict';

describe('Controller: PlayerCtrl', function () {

  // load the controller's module
  beforeEach(module('splytApp'));

  var PlayerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayerCtrl = $controller('PlayerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
