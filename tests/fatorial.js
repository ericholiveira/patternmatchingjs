var PM = require('../compiled/index');

describe("Fatorial", function() {
  it("composed", function() {
    var fat;
    var fat0 = PM.case(0, 1);
    var fat1 = PM.case(1, 1);
    var fatN = PM.case(PM.default, function() {
      return this * fat(this - 1);
    });
    fat = fat0(fat1)(fatN);

    expect(fat(0)).toBe(1);
    expect(fat(1)).toBe(1);
    expect(fat(2)).toBe(2);
    expect(fat(3)).toBe(6);
    expect(fat(4)).toBe(24);
    expect(fat(5)).toBe(120);
  });
  it("with match", function() {
    var fat = function(n) {
      return PM.match(n)(
        PM.case(0, function() {
          return 1;
        }),
        PM.case(1, function() {
          return 1;
        }),
        PM.case(PM.default, function() {
          return this * fat(this - 1);
        })
      );
    };

    expect(fat(0)).toBe(1);
    expect(fat(1)).toBe(1);
    expect(fat(2)).toBe(2);
    expect(fat(3)).toBe(6);
    expect(fat(4)).toBe(24);
    expect(fat(5)).toBe(120);
  });
});