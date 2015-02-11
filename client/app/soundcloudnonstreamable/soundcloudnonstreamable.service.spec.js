'use strict';

describe('Service: soundcloudnonstreamable', function () {

  // load the service's module
  beforeEach(module('splytApp'));

  // instantiate service
  var soundcloudnonstreamable;
  beforeEach(inject(function (_soundcloudnonstreamable_) {
    soundcloudnonstreamable = _soundcloudnonstreamable_;
  }));

  it('should do something', function () {
    expect(!!soundcloudnonstreamable).toBe(true);
  });

});
