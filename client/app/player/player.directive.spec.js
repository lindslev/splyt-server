'use strict';

describe('Directive: player', function () {

  // load the directive's module and view
  beforeEach(module('splytApp'));
  beforeEach(module('app/player/player.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<player></player>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the player directive');
  }));
});