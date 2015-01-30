'use strict';

describe('Service: youtube', function () {

  // load the service's module
  beforeEach(module('splytApp'));

  // instantiate service
  var youtube;
  beforeEach(inject(function (_youtube_) {
    youtube = _youtube_;
  }));

  it('should do something', function () {
    expect(!!youtube).toBe(true);
  });

});
