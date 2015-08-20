(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var Atom;

  module.exports = Atom = (function() {
    function Atom(value) {
      this.value = value;
    }

    return Atom;

  })();

}).call(this);

//# sourceMappingURL=maps\atom.js.map

},{}],2:[function(require,module,exports){
(function() {
  var Atom;

  Atom = require('./atom');

  module.exports = function(value) {
    return new Atom(value);
  };

}).call(this);

//# sourceMappingURL=maps\atomFactory.js.map

},{"./atom":1}],3:[function(require,module,exports){
(function() {
  var Case;

  Case = (function() {
    function Case(pattern, resultBuilder) {
      this.pattern = pattern;
      this.resultBuilder = resultBuilder;
    }

    Case.prototype.test = function(value) {
      return this.pattern.call(value, value);
    };

    Case.prototype.resolve = function(value) {
      return this.resultBuilder.call(value, value);
    };

    return Case;

  })();

  module.exports = Case;

}).call(this);

//# sourceMappingURL=maps\case.js.map

},{}],4:[function(require,module,exports){
(function() {
  var Atom, Case;

  Case = require('./case');

  Atom = require('./atom');

  module.exports = function(pattern, resultBuilder) {
    var patternFunction;
    patternFunction = function(i) {
      return i==pattern;
    };
    if (typeof pattern === 'function') {
      patternFunction = pattern;
    }
    if (pattern instanceof Atom) {
      patternFunction = (function(i) {
        return i === pattern.value;
      });
    }
    if (pattern instanceof RegExp) {
      patternFunction = (function(i) {
        return pattern.test(i);
      });
    }
    return new Case(patternFunction, resultBuilder);
  };

}).call(this);

//# sourceMappingURL=maps\caseFactory.js.map

},{"./atom":1,"./case":3}],5:[function(require,module,exports){
(function() {
  module.exports = {
    match: require('./match'),
    "case": require('./caseFactory'),
    atom: require('./atomFactory')
  };

}).call(this);

//# sourceMappingURL=maps\index.js.map

},{"./atomFactory":2,"./caseFactory":4,"./match":6}],6:[function(require,module,exports){
(function() {
  var Case, match;

  Case = require('./case');

  match = function(value) {
    return function() {
      var _case, _cases, _i, _len;
      _cases = [].slice.call(arguments, 0);
      for (_i = 0, _len = _cases.length; _i < _len; _i++) {
        _case = _cases[_i];
        if (_case instanceof Case && _case.test(value)) {
          return _case.resolve(value);
        }
      }
    };
  };

  module.exports = match;

}).call(this);

//# sourceMappingURL=maps\match.js.map

},{"./case":3}],7:[function(require,module,exports){
var PM = require('../compiled/index');

describe("The default behaviour", function() {
  it("must accept functions in case", function() {
    expect(PM.match(3)(PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    }))).toBe(5);
    expect(PM.match(7)(PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    }))).toBeUndefined();
    expect(PM.match(3)(PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    }), PM.case(function(i) {
      return i == 9;
    }, function(i) {
      return i + 2;
    }))).toBe(5);
  });
  it("must support this as value", function() {
    expect(PM.match(3)(PM.case(function() {
      return this == 3;
    }, function() {
      return this + 2;
    }))).toBe(5);
  });
  it("must handle Atoms", function() {
    expect(PM.match(3)(PM.case(PM.atom(3), function(i) {
      return i + 2;
    }))).toBe(5);
    expect(PM.match(3)(PM.case(PM.atom("3"), function(i) {
      return i + 2;
    }))).toBeUndefined();
  });
  it("must handle values", function() {
    expect(PM.match(3)(PM.case(3, function(i) {
      return i + 2;
    }))).toBe(5);
    expect(PM.match(3)(PM.case("3", function(i) {
      return i + 2;
    }))).toBe(5);
  });
  it("must handle regular expressions", function() {
    var str = '5444741';
    expect(PM.match('5444741')(PM.case(/[0-9]/g, function(i) {
      return i;
    }))).toBe(str);
    expect(PM.match(str)(PM.case(/[a-z]/g, function(i) {
      return str;
    }))).toBeUndefined();
  });
});
},{"../compiled/index":5}],8:[function(require,module,exports){
var PM = require('../compiled/index');

describe("A pattern matching", function() {
  it("must define match case and default", function() {
    expect(PM).toBeDefined();
    expect(PM.match).toBeDefined();
    expect(PM.case).toBeDefined();
  });
});
},{"../compiled/index":5}],9:[function(require,module,exports){
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
},{"../compiled/index":5}]},{},[7,8,9]);
