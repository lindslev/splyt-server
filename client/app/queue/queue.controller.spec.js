'use strict';

describe('Controller: QueueCtrl', function () {

  // load the controller's module
  beforeEach(module('splytApp'));

  var QueueCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QueueCtrl = $controller('QueueCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
