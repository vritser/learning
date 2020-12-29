require('./func')
const log = console.log

function Maybe(x) {
  this.__value = x
}

Maybe.of = x => new Maybe(x)

Maybe.prototype.isNothing = function () {
  return (this.__value == null || this.__value == undefined)
}

Maybe.prototype.join = function(){
  return this.isNothing() ? Maybe.of(null) : this.__value
}

Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}

log(Maybe.of(null).map(match(/hello/)))
log(Maybe.of(1).map(x => x + 2))
log(Maybe.of([1, 2, 3]).map(xs => xs.map(x => x * 3)))

log(Maybe.of(Maybe.of(3)).join().map(x=>x*3).join())

module.exports = Maybe