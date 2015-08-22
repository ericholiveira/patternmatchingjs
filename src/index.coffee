Fail = require('./fail')
Default = require('./default')
module.exports = {
  match:require('./match'),
  case: require('./caseFactory'),
  atom: require('./atomFactory'),
  default: new Default(),
  fail: new Fail(),
  type: require('./type')
}
