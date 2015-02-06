'use strict';

describe('Service: manage', function () {

  // load the service's module
  beforeEach(module('splytApp'));

  // instantiate service
  var manage;
  beforeEach(inject(function (_manage_) {
    manage = _manage_;
  }));

  it('should do something', function () {
    expect(!!manage).toBe(true);
  });

});
