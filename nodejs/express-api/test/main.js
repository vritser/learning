// import { mixin } from './mixins';

// 类的修饰
// const foo = {
//     f() { console.log('foo');}
// }

// @mixin(foo)
// class Test {

// }

// let obj = new Test();
// obj.f();

// 方法的修饰
// const readonly = (target, prop, desc) => {
//     console.log(prop);
//     desc.writable = false;
//     return desc;
// }

// class Person {
//     constructor() {
//         this.first = '李';
//         this.last = '松伟';
//     }
//     @readonly
//     getName() { return `${this.first} ${this.last}` }
// }

// let p = new Person();
// p.name = '';
// let name = p.getName();
// console.log(name);

// class Person {
//   @nonenumerable
//   get kidCount() { return this.children.length; }
// }

// function nonenumerable(target, name, descriptor) {
//   descriptor.enumerable = false;
//   return descriptor;
// }

// let p = new Person();
// let length = p.kidCount();
// console.log(length);

const log = (target, name, descriptor) => {
    let oldValue = descriptor.value;
    descriptor.value = function () {
        console.log(`Calling "${name}" with`, arguments);
        return oldValue.apply(null, arguments);
    }
    return descriptor;
}

class Math {
    @log
    add(a, b) {
        return a + b;
    }
}


const math = new Math();

// passed parameters should get logged now
math.add(2, 4);