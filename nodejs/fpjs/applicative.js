const Container = require('./container')
const R = require('ramda')
const log = console.log

// applicative functor 是实现了 ap 方法的 pointed functor

// applicative functor 是 "组合关闭"(closed under composition)的，即： ap 永远不会改变容器
// 类型，（并不是说不能有多种不同的应用，还是可以把不同的类型压栈，只不过我们知道它们将会在整个应用的
// 过程中保持不变。下例可以说明这一点：
const t0fM = R.compose(Task.of, Maybe.of)
liftA2(R.concat, t0fM('Rainy Days and Mondays'), t0fM(' always get me down'))
// Task(Maybe(Rainy Days and Mondays always get me down))

// NaN 不可用 因为 2 3 都藏在瓶子里
R.add(Container.of(2), Container.of(3))
// Container(add(2))
R.map(R.add, Container.of(2))
// Container(9) 存在 monad 执行顺序问题：所有的代码都只会在前一个 monad 执行完毕后才执行
// 这两个值足够强健且相互独立，如果仅仅为了满足 monad 的顺序要求而延迟 Container(3) 的创建，是非常没有必要的。
Container.of(2).chain(two => Container.of(7).map(R.add(two)))
// ap 能够把一个 functor 的函数值应用到另一个 functor 的值上。
// Container.prototype.ap = function(other){
//   return other.map(this.__value)
// }
// this.__value 是一个函数，将会接收另一个 functor 作为参数，只需 map 它。
Container.of(R.add(2)).ap(Container.of(3)) // => Container(5)
Container.of(2).map(R.add).ap(Container.of(3)) // => Container(5)

// F.of(x).map(f) == F.of(f).ap(F.of(x))
Maybe.of(R.add).ap(Maybe.of(2)).ap(Maybe.of(3)) // => Maybe(5)
Task.of(R.add).ap(Task.of(2)).ap(Task.of(3)) // => Task(5)


log(Container.of(3).map(x => x * 3).__value == Container.of(x => x * 3).ap(Container.of(3)).__value)

log(Container.of([1, 2, 3]).chain(R.map(x => x * 3)))

// 协调与激励 getVal 同时立即执行 异步请求如是
// $ :: String -> IO DOM
const $ = selector => new IO(() => document.querySelector(selector))

// getVal :: String -> IO String
const getVal = R.compose(R.map(R.prop('value')), $)

// signIn :: String -> String -> Bool -> User
const signIn = R.curry((name, pwd, remember_me) => {/* signing in */ })

IO.of(signIn).ap(getVal('#email')).ap(getVal('#password')).ap(IO.of(false))
// IO({id:3,email:rgss@mail.com})

// lift
const liftA2 = R.curry((f, functor1, functor2) => functor1.map(f).ap(functor2))
const liftA3 = R.curry((f, functor1, functor2, functor3) => functor1.map(f).ap(functor2).ap(functor3))

// liftA4 etc.

// Exercise
// checkEmail :: User -> Either String Email
// checkName :: User -> Either String String

// createUser :: String -> String -> IO User
const createUser = R.curry((email, name) => {/* creating */ })

Either.of(createUser).ap(checkEmail(user)).ap(checkName(user))
// Left("invalid email")

liftA2(createUser, checkEmail(user), checkName(user))
// Left("invalid email")

liftA2(R.add, Maybe.of(3), Maybe.of(2))
// Maybe(5)

liftA3(signIn, getVal('#email'), getVal('#password'), IO.of(false))
// IO({id:3,email:rgss@mail.com})

// 同一律（identity）
// A.of(id).ap(v) == v 对一个 functor 应用 id 函数不会改变 v 的值。
const v = Identity.of('Hello id')
Identity.of(id).ap(v) == v
// map(id) == id

// 同态（homomorphism）: 同态就是一个能够保持结构的映射（structure preserving map）。
// A.of(f).ap(A.of(x)) == A.of(f(x))
// 实际上，functor 就是一个在不同范畴间的同态，因为 functor 在经过映射之后保持了原始范畴的结构。
// sample
Either.of(R.toUpper).ap(Either.of('monad')) == Either.of(R.toUpper('monad'))

// 互换（interchange）: 互换表明的是选择让函数在 ap 的左边还是右边发生 lift 是无关紧要的。
// v.ap(A.of(x)) == A.of(f=>f(x)).ap(v)
// 
const h = Task.of(R.reverse)
const x = 'interchange'

h.ap(Task.of(x)) == Task.of(f => f(x)).ap(h)
Container.of(R.reverse).ap(Container.of('hello')).map(log)
Container.of(f => f('hello')).ap(Container.of(R.reverse)).map(log)

// 组合（composition）: 检查标准的函数组合是否适用于容器内部的函数调用。
// A.of(compose).ap(u).ap(v).ap(w) == u.ap(v.ap(w))
let u = IO.of(R.toUpper),
  s = IO.of(R.concat('& beyond')),
  w = IO.of('blood bath ')

IO.of(R.compose).ap(u).ap(s).ap(w) == u.ap(s.ap(w))

