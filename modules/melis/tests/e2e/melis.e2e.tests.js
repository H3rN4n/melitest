'use strict';

describe('Melis E2E Tests:', function() {
  describe('Test Melis page', function() {
    it('Should not include new Melis', function() {
      browser.get('http://localhost:3000/#!/melis');
      expect(element.all(by.repeater('meli in melis')).count()).toEqual(0);
    });
  });
});
