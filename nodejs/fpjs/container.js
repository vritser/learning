const R = require('ramda')
const log = console.log

function Container(x) {
  this.__value = x
}

Container.of = x => new Container(x)

Container.prototype.map = function (f) {
  return Container.of(f(this.__value))
}

Container.prototype.ap = function (other) {
  return other.map(this.__value)
}

Container.prototype.join = function () {
  return this.__value
}

Container.prototype.chain = function (f) {
  return this.map(f).join()
}

log(Container.of(2).map(x => x + 2))

log(Container.of([1, 2, 3]).map(xs => xs.map(x => x * 2)))
log(R.map(R.add(3), Container.of(7)))
log(Array.prototype.map.call([10], R.add(3)))
// 互换（interchange）
Container.of(R.reverse).ap(Container.of('hello')).map(log)
Container.of(f => f('hello')).ap(Container.of(R.reverse)).map(log)

module.exports = Container