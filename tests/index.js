var PM = require('../compiled/index');

describe("A pattern matching", function() {
  it("must define match case and default", function() {
    expect(PM).toBeDefined();
    expect(PM.match).toBeDefined();
    expect(PM.case).toBeDefined();
  });
});