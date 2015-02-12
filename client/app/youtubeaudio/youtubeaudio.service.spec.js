'use strict';

describe('Service: youtubeaudio', function () {

  // load the service's module
  beforeEach(module('splytApp'));

  // instantiate service
  var youtubeaudio;
  beforeEach(inject(function (_youtubeaudio_) {
    youtubeaudio = _youtubeaudio_;
  }));

  it('should do something', function () {
    expect(!!youtubeaudio).toBe(true);
  });

});
