require('babel-core/register');
require("babel-polyfill");

require('./main')

const myClass = require('./promise')
let test = new myClass();
test.then(d => console.log(d)).catch(e => console.log(e));
