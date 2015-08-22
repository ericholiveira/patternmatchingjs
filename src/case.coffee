Atom = require('./atom')
Fail = require('./fail')
ArrayUtil = require('./arrayUtil')
class Case
  constructor:(pattern,resultBuilder,left) ->
    @_all = [@]
    patternFunction = (i) -> `i==pattern`
    if ArrayUtil.isArray(pattern)
      patternFunction = (arr) ->
        return false if arr.length != pattern.length
        return false for a , i in arr when a != pattern[i]
        true
    patternFunction = pattern if typeof pattern == 'function'
    patternFunction = ((i) ->i==pattern.value) if pattern instanceof Atom
    patternFunction = ((i) -> pattern.test(i)) if pattern instanceof RegExp
    patternFunction = (()->) if pattern instanceof Fail
    @pattern = patternFunction
    if typeof resultBuilder == 'function'
      @resultBuilder = resultBuilder
    else
      @resultBuilder = ()->resultBuilder
  test: (value)->
    for _case in @_all
      if _case.pattern.call(value,value)
        return _case.resultBuilder.call(value,value)
  combine:(_case)-> new ComposedCase(@_all,_case._all)

class ComposedCase extends Case
  constructor:(left=[],right=[])->
    @_all = left.concat(right)
module.exports = Case
