'use strict';

describe('Service: queueplayercomm', function () {

  // load the service's module
  beforeEach(module('splytApp'));

  // instantiate service
  var queueplayercomm;
  beforeEach(inject(function (_queueplayercomm_) {
    queueplayercomm = _queueplayercomm_;
  }));

  it('should do something', function () {
    expect(!!queueplayercomm).toBe(true);
  });

});
