Case = require('./case')
caseFactory = (pattern,resultBuilder)->
  _case = new Case(pattern,resultBuilder)
  result = (value)->
    if typeof value == 'function' and value._isCase
      result._case = result._case.combine(value._case)
      result
    else
      result._case.test(value)
  result._isCase = true
  result._case = _case
  result

module.exports = caseFactory
