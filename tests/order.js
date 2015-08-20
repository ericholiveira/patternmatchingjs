var PM = require('../compiled/index');

describe("The order", function() {
  it("must be respected", function() {
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
});