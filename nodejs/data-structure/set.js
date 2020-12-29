function Set() {
  this.dataSource = []
  this.add = add
  this.contains = contains
  this.remove = remove
  this.union = union
  this.intersect = intersect
  this.size = size
  this.subset = subset
  this.difference = difference
  this.higher = higher
  this.lower = lower
}

const log = console.log

function contains(elem) {
  return this.dataSource.indexOf(elem) >= 0
}

function add(elem) {
  return this.contains(elem)
    ? false
    : (this.dataSource.push(elem) && true)
}

function remove(elem) {
  let idx
  return idx = this.dataSource.indexOf(elem) > -1
    ? (this.dataSource.splice(idx, 1) && true)
    : false
}

// 并集
function union(other) {
  let tmp = new Set()
  this.dataSource.forEach(x => tmp.add(x))
  other.dataSource.forEach(v => tmp.contains(v) ? null : tmp.add(v))
  return tmp
}

// 交集
function intersect(other) {
  let res = new Set()
  this.dataSource.forEach(x => other.contains(x) && res.add(x))
  return res
}

function size() {
  return this.dataSource.length
}

// 子集
function subset(other) {
  if (this.size() > other.size())
    return false
  return this.dataSource.every(v => other.contains(v))
}

// 补集
function difference(other) {
  let res = new Set()
  this.dataSource.forEach(v => other.contains(v) || res.add(v))
  return res
}

// 比 elem 大的结果中最小的
function higher(elem) {
  return this.dataSource.filter(x => x > elem).sort()[0]
}

// 比 elme 小的结果中最大的
function lower(elem) {
  return this.dataSource.filter(x => x < elem).sort().reverse()[0]
}

let set = new Set()
set.add(1)
set.add(2)
set.add(3)
let set2 = new Set()
set2.add(5)
set2.add(7)
set2.add(2)
let set3 = new Set()
set3.add(1)
set3.add(2)
set3.add(3)
let s4 = new Set()
s4.add('abstract')
s4.add('hello')
s4.add('world')
s4.add('like')

log(set.union(set2))
log(set.intersect(set2))
log(set.subset(set3))
log(set.difference(set2))
log(s4.higher('invite'))
log(s4.lower('invite'))
