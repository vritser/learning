const R = require('ramda')

const pipe = (...fns) => arg => fns.reduce((z, c) => c(z), arg)

console.log(R.pipe(R.head, R.add(3))([1,2,3]))
