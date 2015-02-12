'use strict';

describe('Service: tumblraudio', function () {

  // load the service's module
  beforeEach(module('splytApp'));

  // instantiate service
  var tumblraudio;
  beforeEach(inject(function (_tumblraudio_) {
    tumblraudio = _tumblraudio_;
  }));

  it('should do something', function () {
    expect(!!tumblraudio).toBe(true);
  });

});
