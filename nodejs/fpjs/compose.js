const R = require('ramda')
const _ = require('lodash/fp')

function f10(x) {
	return new Promise((resolve, reject) => {
		resolve(R.add(10)(x))
	})
}

function delay10() {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(5), 1000)
	})
}

async function exec() {
	const rSum = R.composeP(f10, delay10)
	console.log(rSum())
	const _Sum = _.compose(f10, delay10)
	console.log(_Sum())
}

exec()


// const compose = (...fns) =>
// 	fns.reduceRight((pre, z) =>
// 		(...args) => z(pre(...args)))

const compose = (...fns) => {
	const [f1, f2, ...rest] = fns.reverse(5)
	const rfn = (...args) => f2(f1(...args))
	return rest.length == 0
		? rfn
		: compose(...rest.reverse(), rfn)
}

const m = compose(R.add(3), R.prop('price'))
console.log('m:', m, m.toString())

const ary = [
	{price: 10},
	{price: 50},
	{price: 30},
	{price: 20}
]

console.log(R.map(m, ary))