const R = require('ramda')
const Maybe = require('./maybe')
const log = console.log

function IO(f) {
  this.__value = f
}

IO.of = function (x) {
  return new IO(() => x)
}

IO.prototype.join = function () {
  return this.__value()
}

IO.prototype.map = function (f) {
  return new IO(R.compose(f, this.__value))
}

IO.prototype.ap = function (other) {
  return other.map(this.__value)
}

let io_window = new IO(() => window)

io_window.map(win => win.innerWidth)

io_window.map(R.prop('location')).map(R.prop('href')).map(R.split('/'))

const $ = selector => new IO(() => document.querySelectorAll(selector))

$('#mydiv').map(R.head).map(div => div.innerHTML)

// param
// url :: IO String
const url = new IO(() => '?name=10&id=5&age=8')
// toPairs :: String -> [[String]]
const toPairs = R.compose(R.map(R.split('=')), R.split('&'))
// params :: String -> [[String]]
const params = R.compose(toPairs, R.last, R.split('?'))
// findParam :: String -> IO Maybe [String]
const findParam = key => R.map(R.compose(Maybe.of, R.filter(R.compose(R.equals(key), R.head)), params), url)

let rs = findParam('id')
log(rs)

log(new IO(() => 3).__value())
log(new IO(() => new IO(() => 3)).join().map(x => x * 3).join())
