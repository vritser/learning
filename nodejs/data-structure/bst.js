const log = console.log

function Node(data, left, right) {
  this.data = data
  this.count = 1
  this.left = left
  this.right = right
}

function BST() {
  this.root = null
  this.insert = insert
  this.inOrder = inOrder
  this.preOrder = preOrder
  this.postOrder = postOrder
  this.min = min
  this.max = max
  this.eqs = eqs
  this.remove = remove
  this.length = length
}

function insert(data) {
  let n = this.eqs(data)
  if (n) {
    return n.count += 1
  }
  n = new Node(data, null, null)
  if (this.root == null)
    this.root = n
  else {
    let curr = this.root, old
    while (true) {
      old = curr
      if (data < curr.data) {
        curr = curr.left
        if (curr == null) {
          old.left = n
          break
        }
      } else {
        curr = curr.right
        if (curr == null) {
          old.right = n
          break
        }
      }
    }
  }
}

// 中序
function inOrder(node) {
  return node == null
    ? []
    : [].concat(inOrder(node.left)).concat(node.data).concat(inOrder(node.right))
}

// 先序
function preOrder(node) {
  return node == null
    ? []
    : [].concat(node.data).concat(preOrder(node.left)).concat(preOrder(node.right))
}

// 后序
function postOrder(node) {
  return node == null
    ? []
    : [].concat(postOrder(node.left)).concat(postOrder(node.right)).concat(node.data)
}

// 最小值 最后一个不为 null 的 left 节点
function min() {
  let curr = this.root
  while (curr.left != null) {
    curr = curr.left
  }
  return curr
}

// 最大值 最后一个不为 null 的 right 节点
function max() {
  let curr = this.root
  while (curr.right != null) {
    curr = curr.right
  }
  return curr
}

// 相等值的节点
function eqs(val) {
  let curr = this.root
  while (curr != null) {
    if (val == curr.data)
      return curr
    else if (val < curr.data)
      curr = curr.left
    else
      curr = curr.right
  }
  return null
}

function length() {
  return count(this.root)
}

function count(node) {
  if (node != null) {
    return 1 + count(node.left) + count(node.right)
  }
  return 0
}

// 删不掉。。
function remove(data) {
  let root = removeNode(this.root, data)
  log('root:', this.root)
  log('removed:', root)
}

function removeNode(node, data) {
  if (node == null) {
    return null
  }
  if (node.data == data) {
    if (node.left == null && node.right == null) {
      return null
    }
    if (node.left == null) {
      return node.right
    }
    if (node.right == null) {
      return node.left
    }
    let tmp = this.min()
    node.data = tmp.data
    node.right = removeNode(node.right, tmp.data)
    return node
  } else if (node.data < data) {
    node.left = removeNode(node.left, data)
    return node
  } else {
    node.right = removeNode(node.right, data)
    return node
  }
}

let bst = new BST()
bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);
bst.insert(23)
bst.insert(52)
log(bst.inOrder(bst.root))
log(bst.preOrder(bst.root))
log(bst.postOrder(bst.root))
log(bst.min())
log(bst.max())
log(bst.eqs(16))
log(bst.length())
log(bst.root)