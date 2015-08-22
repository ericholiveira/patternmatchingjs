var PM = require('../compiled/index');
var _Promise = require('bluebird');
describe("An async pattern matching", function() {
  it("must support promise", function(done) {
    var fat0 = PM.case(0, 1);
    var fatN = PM.case(PM.default, function() {
      return this * fatN(this - 1);
    });
    fatN = fat0(fatN);

    expect(fatN(3)).toBe(6);

    fatN(_Promise.resolve(3)).then(function(result){
      expect(fatN(3)).toBe(6);
      done();
    });
  });
});
