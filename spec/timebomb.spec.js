describe("TimeBomb", function() {
  var TimeBomb = require('../src/timebomb.js');

  describe("Figuring out time until close", function() {
    beforeEach(function() {
      jasmine.clock().install();
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });
    it("Can calculate minutes until time to close", function() {
      var now = new Date("1/29/1999 7:00:01");
      jasmine.clock().mockDate(now);
      expect(TimeBomb.minutesUntil("8:00 am")).toEqual(60);
    });

    it("Returns one instead of zero if the times are the same", function() {
      var now = new Date("1/29/1999 7:00");
      jasmine.clock().mockDate(now);
      expect(TimeBomb.minutesUntil("7:00 am")).toEqual(1);
    });

    it("Assumes times in the past are for tomorrow", function() {
      var now = new Date("1/29/1999 7:00:01");
      jasmine.clock().mockDate(now);
      expect(TimeBomb.minutesUntil("6:00 am")).toEqual(23 * 60);
    });
  });
});
