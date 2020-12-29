function List() {
  this.pos = 0
  this.size = 0
  this.dataSource = []
  this.length = length
  this.append = append
  this.insert = insert
  this.clear = clear
  this.find = find
  this.remove = remove
  this.toString = toString
  this.getElem = getElem
  this.front = front
  this.end = end
  this.next = next
  this.prev = prev
  this.moveTo = moveTo
  this.currPos = currPos
}

const log = console.log

function front() {
  this.pos = 0
}

function end() {
  this.pos = this.size - 1
}

function prev() {
  if (this.pos > 0)
    --this.pos
}

function next() {
  if (this.pos < this.size)
    this.pos++
}

function moveTo(pos) {
  this.pos = pos
}

function currPos() {
  return this.pos
}

function getElem() {
  return this.dataSource[this.pos]
}

function append(elem) {
  this.dataSource[this.size++] = elem
}

function remove(elem) {
  let dataSource = this.dataSource
  dataSource.forEach((v, i) => v == elem && (dataSource.splice(i, 1) && this.size--))
}

function clear() {
  this.dataSource = []
  this.size = 0
}

function insert(old, elem) {
  let pos = this.find(old)
  if (pos > -1) {
    this.dataSource.splice(pos, 0, elem)
    this.size++
    return true
  }
  return false
}

function toString() {
  return this.dataSource
}

function length() {
  return this.size
}

function find(elem) {
  let res = -1
  this.dataSource.forEach((v, i) => {
    if (v == elem) {
      res = i
      return
    }
  })
  return res
}

var xs = new List()
xs.append(1)
xs.append(2)
xs.append(3)

xs.next()
log(xs.currPos())
xs.next()
xs.next()
log(xs.currPos())
xs.next()
log(xs.currPos())
xs.next()
log(xs.currPos())
xs.prev()
log(xs.currPos())

for (xs.front(); xs.currPos() < xs.length(); xs.next()) {
  log(xs.getElem())
}
