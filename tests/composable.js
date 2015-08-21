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
  it("must be accept multiple compositions", function() {
    var f34 = PM.case(3, 3);
    f34 = f34(PM.case(4, 4));
    var f56 = PM.case(5, 5);
    f56 = f56(PM.case(6, 6));
    var f3456 = f34(f56);
    expect(f3456(3)).toBe(3);
    expect(f3456(4)).toBe(4);
    expect(f3456(5)).toBe(5);
    expect(f3456(6)).toBe(6);
  });
});