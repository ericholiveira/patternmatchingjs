var PM = require('../compiled/index');

describe("The order", function() {
  it("must be respected on match", function() {
    //First match
    expect(PM.match(3)(PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    }), PM.case(function(i) {
      return i == 9;
    }, function(i) {
      return i + 2;
    }))).toBe(5);
    // Second match
    expect(PM.match(3)(PM.case(function(i) {
      return i == 9;
    }, function(i) {
      return i + 2;
    }), PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    }))).toBe(5);
    //matches the first and the last, but only handle the first
    expect(PM.match(3)(PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    }), PM.case(function(i) {
      return i == 9;
    }, function(i) {
      return i + 2;
    }), PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 10;
    }))).toBe(5);
  });
  it("must be respected on composition", function() {
    var case3Function = PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    });
    var case9 = PM.case(function(i) {
      return i == 9;
    }, function(i) {
      return i + 2;
    });
    //First match
    expect(case3Function(case9)(3)).toBe(5);
    expect(case3Function(case9)(9)).toBe(11);
    var case3 = PM.case(3, function(i) {
      return -1;
    });
    expect(case3Function(case9)(case3)(3)).toBe(5);
    expect(case3(case9)(case3Function)(3)).toBe(-1);
  });
});