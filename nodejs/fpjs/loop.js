const log = console.log

const loop = f => ([x, ...xs]) => {
  if (x != undefined) {
    f(x)
    loop(f)(xs)
  }
}
loop(log)([1, 2, 3])

const steps = step1 => step2 => x =>
  step2(step1(x))

const each = f => ([x, ...xs]) => {
  if (x != undefined) {
    steps(f)(_ => each(f)(xs))(x)
  }
}
each(log)([4, 5, 6])
