Case = require('./case')

caseFactory = (pattern,resultBuilder)->resultFactory(new Case(pattern,resultBuilder))

resultFactory = (_case)->
  result = (value)->
    if typeof value == 'function' and value._case
      resultFactory(result._case.combine(value._case))
    else
      result._case.test(value)
  result._case = _case
  result

module.exports = caseFactory
