require('./support')

// pointed functor 是实现了 of 方法的 functor。
// of 方法不是用来避免使用 new 关键字的，而是用来把值放到默认最小化上下文（default minimal context）中的。

// map/join 的抽象
const chain = curry((f,m) => m.map(f).join())


