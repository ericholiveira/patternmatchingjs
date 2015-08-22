Fail = require('./fail')
module.exports = {
  match:require('./match'),
  case: require('./caseFactory'),
  atom: require('./atomFactory'),
  default: ()->true,
  fail: new Fail(),
  type: require('./type')
}
