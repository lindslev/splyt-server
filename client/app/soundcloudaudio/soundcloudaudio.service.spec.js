'use strict';

describe('Service: soundcloudaudio', function () {

  // load the service's module
  beforeEach(module('splytApp'));

  // instantiate service
  var soundcloudaudio;
  beforeEach(inject(function (_soundcloudaudio_) {
    soundcloudaudio = _soundcloudaudio_;
  }));

  it('should do something', function () {
    expect(!!soundcloudaudio).toBe(true);
  });

});
