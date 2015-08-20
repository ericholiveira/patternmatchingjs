class Case
  constructor:(@pattern,@resultBuilder) ->
  test: (value)->@pattern.call(value,value)
  resolve: (value)->@resultBuilder.call(value,value)

module.exports = Case
