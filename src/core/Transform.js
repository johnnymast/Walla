class Transform {

  /**
   * Translate a coordinate on a screen to the
   * same coordinate when zoomed in at (k) percent.
   *
   * @param {Number} k - The scale factor.
   * @param {Number} x - The x coordinate.
   * @param {Number} y - The y coordinate.
   */
  constructor (k = 1, x = 0, y = 0) {
    this.k = k
    this.x = x
    this.y = y
  }

  /**
   *
   * @param {Number} k - The scale factor.
   * @returns {Transform}
   */
  scale (k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y)
  }

  /**
   *
   * @param {Number} x - x coordinate.
   * @param {Number} y - y coordinate.
   * @returns {Transform}
   */
  translate (x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Transform
}
