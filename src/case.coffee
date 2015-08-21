Atom = require('./atom')
Fail = require('./fail')
class Case
  constructor:(pattern,resultBuilder,previous=[]) ->
    #@_pattern = pattern
    @_all = previous.concat(@)
    patternFunction = (i) -> `i==pattern`
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
  combine:(_case)-> new Case(_case.pattern,_case.resultBuilder,@_all)

module.exports = Case
