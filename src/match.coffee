Case = require('./case')
match = (value) ->
  () ->
    _cases = [].slice.call(arguments,0)
    for _case in _cases
      if _case instanceof Case and _case.test(value)
        return _case.resolve(value)
module.exports = match
