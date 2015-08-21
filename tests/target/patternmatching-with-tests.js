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
  var Atom, Case, Fail;

  Atom = require('./atom');

  Fail = require('./fail');

  Case = (function() {
    function Case(pattern, resultBuilder, previous) {
      var patternFunction;
      if (previous == null) {
        previous = [];
      }
      this._all = previous.concat(this);
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
      if (pattern instanceof Fail) {
        patternFunction = (function() {});
      }
      this.pattern = patternFunction;
      if (typeof resultBuilder === 'function') {
        this.resultBuilder = resultBuilder;
      } else {
        this.resultBuilder = function() {
          return resultBuilder;
        };
      }
    }

    Case.prototype.test = function(value) {
      var _case, _i, _len, _ref;
      _ref = this._all;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _case = _ref[_i];
        if (_case.pattern.call(value, value)) {
          return _case.resultBuilder.call(value, value);
        }
      }
    };

    Case.prototype.combine = function(_case) {
      return new Case(_case.pattern, _case.resultBuilder, this._all);
    };

    return Case;

  })();

  module.exports = Case;

}).call(this);

//# sourceMappingURL=maps\case.js.map

},{"./atom":1,"./fail":5}],4:[function(require,module,exports){
(function() {
  var Case, caseFactory;

  Case = require('./case');

  caseFactory = function(pattern, resultBuilder) {
    var result, _case;
    _case = new Case(pattern, resultBuilder);
    result = function(value) {
      if (typeof value === 'function' && value._isCase) {
        result._case = result._case.combine(value._case);
        return result;
      } else {
        return result._case.test(value);
      }
    };
    result._isCase = true;
    result._case = _case;
    return result;
  };

  module.exports = caseFactory;

}).call(this);

//# sourceMappingURL=maps\caseFactory.js.map

},{"./case":3}],5:[function(require,module,exports){
(function() {
  var Fail;

  module.exports = Fail = (function() {
    function Fail() {}

    return Fail;

  })();

}).call(this);

//# sourceMappingURL=maps\fail.js.map

},{}],6:[function(require,module,exports){
(function() {
  var Fail;

  Fail = require('./fail');

  module.exports = {
    match: require('./match'),
    "case": require('./caseFactory'),
    atom: require('./atomFactory'),
    "default": function() {
      return true;
    },
    fail: new Fail()
  };

}).call(this);

//# sourceMappingURL=maps\index.js.map

},{"./atomFactory":2,"./caseFactory":4,"./fail":5,"./match":7}],7:[function(require,module,exports){
(function() {
  var Case, Fail, caseFactory, fail, match;

  Case = require('./case');

  caseFactory = require('./caseFactory');

  Fail = require('./fail');

  fail = new Fail();

  match = function(value, log) {
    return function() {
      var acc, _case, _cases, _i, _len;
      _cases = [].slice.call(arguments, 0);
      acc = caseFactory(fail);
      for (_i = 0, _len = _cases.length; _i < _len; _i++) {
        _case = _cases[_i];
        if (_case._isCase) {
          acc = acc(_case);
        }
      }
      return acc(value);
    };
  };

  module.exports = match;

}).call(this);

//# sourceMappingURL=maps\match.js.map

},{"./case":3,"./caseFactory":4,"./fail":5}],8:[function(require,module,exports){
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
},{"../compiled/index":6}],9:[function(require,module,exports){
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
    expect(PM.match(3)(PM.case(PM.atom("4"), function(i) {
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
},{"../compiled/index":6}],10:[function(require,module,exports){
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
},{"../compiled/index":6}],11:[function(require,module,exports){
var PM = require('../compiled/index');

describe("A pattern matching", function() {
  it("must define match case and default", function() {
    expect(PM).toBeDefined();
    expect(PM.match).toBeDefined();
    expect(PM.case).toBeDefined();
    expect(PM.default).toBeDefined();
    expect(PM.default).toBeDefined();
  });
});
},{"../compiled/index":6}],12:[function(require,module,exports){
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
},{"../compiled/index":6}]},{},[8,9,10,11,12]);
