'use strict';

describe('Service: audiosources', function () {

  // load the service's module
  beforeEach(module('splytApp'));

  // instantiate service
  var audiosources;
  beforeEach(inject(function (_audiosources_) {
    audiosources = _audiosources_;
  }));

  it('should do something', function () {
    expect(!!audiosources).toBe(true);
  });

});
