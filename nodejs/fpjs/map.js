const log = console.log

const map = f => ([x, ...xs]) =>
  x == undefined
    ? []
    : [f(x), ...map(f)(xs)]
log(map(x => x * 2)([1, 2, 3]))

// with accumulate
const mapByReduce = f => acc => ([x, ...xs]) =>
  x == undefined
    ? acc
    : mapByReduce(f)([...acc, f(x)])(xs)
    
const mapr = f => xs => mapByReduce(f)([])(xs)
log(mapr(x => x * 2)([1, 2, 3]))
