
window.extend = function (a, b) {
  a.prototype = Object.create(b.prototype)
  a.prototype.constructor = a
  a.prototype.super = b.prototype
}
