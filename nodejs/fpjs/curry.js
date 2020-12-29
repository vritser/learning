const R = require('ramda')

const curryN = (fn, arity = fn.length) => {
    return (function nextCurry(preArgs) {
        return function (...next) {
            const args = preArgs.concat(next)
            if (args.length >= arity)
                return fn(...args)
            return nextCurry(args)
        }
    })([])
}

const compose = (...fns) => 
	arg => fns.reduceRight((z, fn) => fn(z), arg)

const add = (x, y) => x + y
const a2 = curryN(add)
console.log(a2(1, 2))

const m = compose(R.add(3), R.prop('price'))

const ary = [
	{price: 10},
	{price: 50},
	{price: 30},
	{price: 20}
]

console.log(R.map(m, ary))