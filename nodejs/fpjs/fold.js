const log = console.log

const foldl = f => acc => ([x, ...xs]) =>
  x == undefined
    ? acc
    : foldl(f)(f(acc, x))(xs) // foldl(f)(f(acc)(x))(xs)

const sum = foldl((acc, x) => acc + x)(0) // foldl(acc=>x=>acc+x)(0)([1,2,3])
const loop = f => foldl((_, x) => f(x))([])

log('sum:', sum([1, 2, 3]))
loop(log)([1, 2, 3])

const foldr = f => acc => ([x, ...xs]) =>
  x == undefined
    ? acc
    : f(x)(foldr(f)(acc)(xs))

const eachr = f => foldr(x => _ => f(x))([])

eachr(log)([4, 5, 6])

// scanl :: (b -> a -> b) -> b -> [a] -> [b]
const scanl = (f, z, [x, ...xs]) =>
  x == undefined
    ? [z]
    : [z].concat(scanl(f, f(z, x), xs))

const scanl1 = (f, [x, ...xs]) => scanl(f, x, xs)

log(scanl1((z, x) => z + x, [1, 2, 3, 4, 5]))
