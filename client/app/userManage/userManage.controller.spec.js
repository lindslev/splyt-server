'use strict';

describe('Controller: UserManageCtrl', function () {

  // load the controller's module
  beforeEach(module('splytApp'));

  var UserManageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserManageCtrl = $controller('UserManageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
