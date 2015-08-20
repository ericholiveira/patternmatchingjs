Case = require('./case')
Atom = require('./atom')
module.exports = (pattern,resultBuilder)->
  patternFunction = (i) -> `i==pattern`
  patternFunction = pattern if typeof pattern == 'function'
  patternFunction = ((i) ->i==pattern.value) if pattern instanceof Atom
  patternFunction = ((i) -> pattern.test(i)) if pattern instanceof RegExp
  new Case(patternFunction,resultBuilder)
