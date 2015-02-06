'use strict';

describe('Directive: songslist', function () {

  // load the directive's module and view
  beforeEach(module('splytApp'));
  beforeEach(module('app/songslist/songslist.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<songslist></songslist>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the songslist directive');
  }));
});