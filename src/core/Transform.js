let Transform = function (k = 1, x = 0, y = 0) {
  this.k = k
  this.x = x
  this.y = y
}

Transform.prototype = {
  constructor: Transform,
  scale: function (k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y)
  },
  translate: function (x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Transform
}
