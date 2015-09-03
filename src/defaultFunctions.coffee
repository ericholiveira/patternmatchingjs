arrayUtil = require('arrayUtil')
defaultFunctions = {
  isEven:(n)->n%2==0
  isOdd:(n)->n%2==1
  isTruthy:(n)->!!n
  isFalsy:(n)->!n
  isAlphanumeric:(n)->/^[a-z0-9]+$/i.test(n)
  isArray:arrayUtil.isArray
}
toIsNot=(name) -> "isNot#{name.substring(2,name.length)}"
isNotFactory = (name,obj)->
  obj[toIsNot(name)] = (n) -> !obj[name](n)

isNotFactory(func,defaultFunctions) for func of defaultFunctions

module.exports = defaultFunctions
