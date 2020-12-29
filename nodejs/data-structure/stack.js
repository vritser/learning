function Stack() {
  this.dataSource = []
  this.top = 0
  this.push = push
  this.pop = pop
  this.peek = peek
  this.clear = clear
  this.length = length
}

const log = console.log

function push(elem) {
  this.dataSource[this.top++] = elem
}

function pop() {
  return this.dataSource[--this.top]
}

function clear() {
  this.top = 0
}

function peek() {
  return this.dataSource[this.top - 1]
}

function length() {
  return this.top
}

let stack = new Stack()
stack.push(1)
log(stack.peek())
stack.push(2)
stack.push(3)
log(stack.pop())
log(stack.length())
log(stack.dataSource)
stack.clear()
log(stack.length())

function transform(num, base) {
  let s = new Stack()
  do {
    s.push(num % base)
    num = Math.floor(num /= base)
  } while (num > 0)
  let res = ''
  while (s.length() > 0) {
    res += s.pop()
  }
  return res
}

log(transform(10, 2))
log(transform(61, 2))

function isPalindrome(word) {
  let s = new Stack()
  word.split('')
    .forEach(v => s.push(v))
  let reversed = ''
  while (s.length() > 0) {
    reversed += s.pop()
  }
  return word == reversed
}

log(isPalindrome('haha'))
log(isPalindrome('12321'))
log(isPalindrome('kottok'))

function factorial(n) {
  let s = new Stack()
  while (n > 0) s.push(n--)
  let res = 1
  while (s.length() > 0) res *= s.pop()
  return res
}

log(factorial(5))
log(factorial(10))

// 1. 2.3 + 23 / 12 + (3.14159×0.24。 返回缺失括号的位置


// 2. 将中缀表达式转为逆波兰表达式


// 3. 现实生活中栈的一个例子是佩兹糖果盒。想象一下你有一盒佩兹糖果，
// 里面塞满了红 色、黄色和白色的糖果，但是你不喜欢黄色的糖果。使用栈(有可能用到多个栈)写一 段程序，
// 在不改变盒内其他糖果叠放顺序的基础上，将黄色糖果移出。
