const log = console.log
compose = (f, g) => x => f(g(x))

match = reg => x => x.match(reg)


const min = (x, y) => x < y ? x : y

const minimum = ([x, ...xs]) => {
    if (x == undefined) throw new Error('Empty list')
    return xs.length == 0
        ? [x]
        : min(x, minimum(xs))
}

// [1.5, 2.5, 3.5, 4.5]

console.log('min:', minimum([-3, 9, 2, 3]))
// 2

const range = (a, b) =>
    a == b
        ? b
        : [].concat(a).concat(range(a + 1, b))
// or
// const range = (a, b) =>
//   a == b
//     ? [b]
//     : [a, ...range(a + 1, b)]
// or
// const range = (a, b) =>
//   Array.from({ length: b })
//     .map((_, i) => i + a)

log(range(1, 5))

const each = f => ([x, ...xs]) => {
    if (x !== void 0) {
        f(x)
        each(f)(xs)
    }
}
each(log)([1, 2, 3])

// zip :: ([a], [b]) -> [c]
const zip = ([x, ...xs], [y, ...ys]) =>
    x == void 0 || y == void 0
        ? []
        : [[x, y], ...zip(xs, ys)]

// zipWith :: ((a, b) -> c, [a], [b]) -> [c]
const zipWith = (f, [x, ...xs], [y, ...ys]) =>
    x == void 0 || y == void 0
        ? []
        : [f(x, y), ...zipWith(f, xs, ys)]

const flat = r => xs => xs.reduce((z, x) => {
    typeof x == 'object' && x.length > 0
        ? flat(z)(x)
        : (z.push(x))
    return z
}, r)

const flatten = flat([])

const init = ([x, ...xs]) => {
    return xs.length >= 1
        ? [x, ...init(xs)]
        : []
}
// or
// const init = xs => xs.slice(0,-1)

const take = (c, [x, ...xs]) =>
    (c <= 0 || x == void 0)
        ? []
        : [x, ...take(c - 1, xs)]

const skip = (c, [x, ...xs]) =>
    c <= 1
        ? xs
        : skip(c - 1, xs)

log('skip:', skip(5, [1, 2, 3, 4]))
log('take:', take(3, [1, 2, 3, 4]))

const product = ([x, ...xs]) =>
    x == void 0
        ? 1
        : x * product(xs)

const sum = ([x, ...xs]) =>
    x == void 0
        ? 0
        : x + sum(xs)

const length = ([x, ...xs]) =>
    x == void 0
        ? 0
        : 1 + length(xs)

const each_slice = (f, c, xs) => {
    let tail = skip(c, xs),
        item = take(c, xs)
    if (item.length > 0) {
        f(...item)
        each_slice(f, c, tail)
    }
}

const contains = (z, [x, ...xs]) => {
    if (z == x)
        return true
    return x == void 0
        ? false
        : contains(z, xs)
}

log('res:', contains(3, [1, 2, 5]))

const uniq = ([x, ...xs], z) => {
    return x == undefined
        ? z
        : contains(x, z)
            ? uniq(xs, z)
            : uniq(xs, [...z, x])
}

const uniqBy = (f, [x, ...xs]) => {
    let z = []
    if (x == undefined)
        return z

}

const repeat = (n, x) => {
    return n == 0
        ? []
        : [x, ...repeat(n-1, x)]
}


log('uniq:', uniq([1, 2, 3, 3, 1], []))

each_slice(log, 2, [1, 2, 3, 4, 5])

console.log('init:', init([1, 2, 3, 4, 5]))

console.log(zip([1, 2, 3], [4, 5, 6]))

console.log(zipWith((a, b) => [a, b], [1, 2, 3], [4, 5, 6, 7]))

console.log(flatten([1, 2, [3, 4, [5, 6]]]))