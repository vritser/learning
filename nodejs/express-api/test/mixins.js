export const mixin = (...list) => target => {
    Object.assign(target.prototype, ...list);
}