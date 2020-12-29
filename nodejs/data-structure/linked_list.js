function Node(elem) {
  this.elem = elem
  this.next = null
  // 双向
  this.prev = null
}

function LinkList() {
  this.head = new Node('head')
  // 循环
  this.head.next = this.head
  this.disLoop = disLoop
  this.life = life
  this.insertLoop = insertLoop
  this.lastOnLoop = lastOnLoop

  // 单向
  this.find = find
  this.insert = insert
  this.remove = remove
  this.display = display

  // 双向
  this.pre = pre
  this.remove2 = remove2
  this.last = last
  this.disReverse = disReverse
}

const log = console.log

function find(item) {
  let curr = this.head
  while (curr.elem != item) {
    curr = curr.next
  }
  return curr
}

function insert(item, newEl) {
  let node = new Node(newEl)
  let curr = this.find(item)
  node.next = curr.next
  node.prev = curr
  curr.next = node
}

function display() {
  let curr = this.head
  while (curr.next != null) {
    log('elem:', curr.next.elem)
    curr = curr.next
  }
}

function pre(item) {
  let curr = this.head
  while (curr.next.elem != item) {
    curr = curr.next
  }
  return curr
}

function remove(item) {
  let pre = this.pre(item)
  if (pre.next != null) {
    pre.next = pre.next.next
  }
}

function remove2(item) {
  let curr = this.find(item)
  if (curr.next != null) {
    curr.prev.next = curr.next
    curr.next.prev = curr.prev
    curr.prev = null
    curr.next = null
  }
}

function last() {
  let curr = this.head
  while (curr.next != null) {
    curr = curr.next
  }
  return curr
}

function disReverse() {
  let curr = this.last()
  while (curr.prev != null) {
    log('elem:', curr.elem)
    curr = curr.prev
  }
}

function disLoop() {
  let curr = this.head
  while (curr.next != null && curr.next.elem != 'head') {
    log('elem:', curr.elem)
    curr = curr.next
  }
}

function lastOnLoop() {
  let curr = this.head
  while (curr.next != this.head) {
    curr = curr.next
  }
  return curr
}

function insertLoop(elem) {
  let node = new Node(elem)
  let last = this.lastOnLoop()
  node.next = last.next
  last.next = node
}

function life() {
  let curr = this.head
  while (curr.elem != curr.next.next.elem) {
    let snd = curr.next,
      trd = snd.next
    snd.next = trd.next
    trd.next = null
    curr = snd.next
  }
  log('fst:', curr.elem, 'snd:', curr.next.elem)
}

// let ll = new LinkList()
// ll.insert('head', 1)
// ll.insert(1, 2)
// ll.insert(2, 3)
// ll.display()
// ll.remove(2)
// ll.display()

// 双向链表
log('-------------')
// let ll2 = new LinkList()
// ll2.insert('head', 1)
// ll2.insert(1, 2)
// ll2.insert(2, 3)
// ll2.display()
// ll2.disReverse()
// ll2.remove2(1)
// ll2.display()

//
let lr = new LinkList()
lr.insertLoop(1)
lr.insertLoop(2)
lr.insertLoop(3)
lr.insertLoop(4)
lr.insertLoop(5)
// lr.disLoop()
lr.life()
