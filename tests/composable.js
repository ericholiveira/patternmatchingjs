var PM = require('../compiled/index');

describe("A case", function() {
  it("must be composable", function() {
    var f = PM.case(3, function() {
      return 3;
    });
    expect(f(3)).toBe(3);
    expect(f(4)).toBeUndefined();
    f = f(PM.case(4, function() {
      return 4;
    }));
    f = f(PM.case(5, function() {
      return 5;
    }));
    expect(f(3)).toBe(3);
    expect(f(4)).toBe(4);
    expect(f(5)).toBe(5);
  });
});