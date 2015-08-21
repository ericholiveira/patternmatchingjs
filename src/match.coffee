Case = require('./case')
caseFactory = require('./caseFactory')
Fail = require('./fail')
fail = new Fail()
match = (value,log) ->
  () ->
    _cases = [].slice.call(arguments,0)
    acc = caseFactory(fail)
    for _case in _cases
      if _case._isCase
        acc = acc(_case)
    acc(value)
module.exports = match
