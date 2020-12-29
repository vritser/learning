function Queue() {
  this.dataSource = []
  this.enqueue = enqueue
  this.dequeue = dequeue
  this.front = front
  this.back = back
  this.empty = empty
  this.toString = toString
}

const log = console.log

function enqueue(elem) {
  this.dataSource.push(elem)
}

function dequeue() {
  return this.dataSource.shift()
}

function front() {
  return this.dataSource[0]
}

function back() {
  return this.dataSource[this.dataSource.length - 1]
}

function empty() {
  return this.dataSource.length == 0
}

function toString() {
  return this.dataSource.join('\n')
}

let q = new Queue()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
log(q.toString())
q.dequeue()
log(q.toString())
log(q.front())
log(q.back())

// 方块舞
let data = ['F 1', 'F 2', 'M 1', 'F 3', 'M 2', 'M 3', 'M 4']

function dance() {
  let males = new Queue(),
    females = new Queue()
  data.forEach(v => {
    if (/^F/.test(v))
      females.enqueue(v)
    if (/^M/.test(v))
      males.enqueue(v)
  })
  while (!males.empty() && !females.empty()) {
    let p = males.dequeue()
    log('male dancer is: ', p)
    p = females.dequeue()
    log('and female dancer is: ', p)
  }
}

dance()

// 使用队列来排序（基数排序 0-99)
// 分配给队列
function distribute(queues, nums, n, digit) {
  for (let i = 0; i < n; i++) {
    if (digit == 1)
      queues[nums[i] % 10].enqueue(nums[i])
    else
      queues[Math.floor(nums[i] / 10)].enqueue(nums[i])
  }
}

function collect(queues, nums) {
  let i = 0
  for (let digit = 0; digit < 10; digit++)
    while (!queues[digit].empty())
      nums[i++] = queues[digit].dequeue()
}

let queues = Array.from({ length: 10 })
  .map(_ => new Queue())

let nums = Array.from({ length: 10 })
  .map(_ => Math.floor(Math.random() * 100))

log('before radix sort:', nums)
distribute(queues, nums, 10, 1)
collect(queues, nums)
distribute(queues, nums, 10, 10)
collect(queues, nums)
log('after radix sort:', nums.join(' '))

function quickSort(xs) {
  return xs.length < 2 ? xs : (x = xs.shift()) ? quickSort(xs.filter(v => v <= x)).concat(x, quickSort(xs.filter(v => v > x))) : []
}

log(quickSort([2, 5, 3, 2, 1, 7, 9]))

//

function chunk(size, ary) {
  if (ary.length == 0) return []
  if (ary.length < size) return [ary]
  rest = ary.splice(size)
  return [ary].concat(chunk(size, rest))
}

log(chunk(4, [1, 2, 3, 4, 5]))

let ary = [1, 2, 3, 4]
log('---------------------------------------')
const each_slice = f => size => xs => {
  if (xs.length > 0) {
    let rest = xs.splice(size)
    return f(xs).concat(each_slice(f)(size)(rest))
  }
}

const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0)

const compose = (f, g) => x =>
  f(g(x))

let xs = ['1234567', '878236415', 'ab']

let res = xs.reduce((acc, x) => {
  if (acc && acc.length == 3) {
    return acc.concat(',')
  } else {
    return acc + x
  }
}, '')

// log(xs.map(x => each_slice(xs => xs.join('') + ',')(3)(x.split(''))))

let size = 3
res = xs.map(x => chunk(size, x.split(''))).map(ys =>
  ys.map(y => {
    if (y.length == size) return y.join('').concat(',')
    return y.join('')
  }).join('').replace(/,$/, '')
)

log('res:', res)


