const R = require('ramda')

const fib = _ => ({
    a: 0,
    b: 1,
    next() {
        let last = this.b
        this.c = this.a, this.a = this.b, this.b = this.a + this.c
        return { done: false, value: last }
    },
    [Symbol.iterator]() {
        return this
    }
})

let i = 0
for (let a of fib()) {
    console.log(a)
    if (++i > 10) break
}


const obj = {
    [Symbol.iterator]() {
        return {
            a: 1,
            next() {
                return { value: this.a++, done: false }
            }
        }
    }
}

for (let b of obj) {
    console.log('b:', b)
    if (++i > 20) break
}



const iterable = [1, 2, 3]
const iterator = iterable[Symbol.iterator]()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

const qs = ([x, ...xs]) =>
    x == void 0
        ? []
        : [...qs(R.filter(z => x > z, xs)), x, ...qs(R.filter(z => x <= z, xs))]

console.log(qs([7, 2, 5, 9, 3, 7]))
