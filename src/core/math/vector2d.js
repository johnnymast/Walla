/**
 * Class for Vector2d math calculations.
 *
 * @class
 */
class Vector2d {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  /**
   * @example
   * let vector = new Vector2d(1,3);
   *
   * // Our vector looks like this
   * // { x: 1, y: 3 }
   *
   * // Lets add 2 to all values
   * let result = vector.add(2);
   *
   * // Our resulting vector now looks like this
   * // { x: 3, y: 5 }
   *
   * console.log(result.toObject())
   *
   * @param {number|Vector2d} n Add a number to the matrix or add a an other Matrix object
   * @returns {object}
   */
  toObject () {
    return {x: this.x, y: this.y}
  }

  /**
   * Clone the matrix into a new Matrix object.
   *
   * @returns {Vector2d}
   */
  clone () {
    return new Vector2d(this.x, this.y)
  }

  // element wise

  /**
   * @example
   * let vector = new Vector2d(1,3);
   *
   * // Our vector looks like this
   * // { x: 1, y: 3 }
   *
   * // Lets add 2 to all values
   * let result = vector.add(2);
   *
   * // Our resulting vector now looks like this
   * // { x: 2, y: 6 }
   *
   * console.log(result.toObject())
   *
   * @param {number|Vector2d} n Add a number to the matrix or add a an other Matrix object
   * @returns {Vector2d}
   */
  add (n) {
    if (n instanceof Vector2d) {
      this.x += n.x
      this.y += n.y
    } else {
      this.x += n
      this.y += n
    }
    return this
  }

  /**
   * @example
   * let vector = new Vector2d(1,3);
   *
   * // Our vector looks like this
   * // { x: 1, y: 3 }
   *
   * // Lets subtract 2 to all values
   * let result = vector.subtract(2);
   *
   * // Our resulting vector now looks like this
   * // { x: -1, y: 1 }
   *
   * console.log(result.toObject())
   *
   * @param {number|Vector2d} n Add a number to the matrix or add a an other Matrix object
   * @returns {Vector2d}
   */
  subtract (n) {
    if (n instanceof Vector2d) {
      this.x -= n.x
      this.y -= n.y
    } else {
      this.x -= n
      this.y -= n
    }
    return this
  }

  /**
   * @example
   * let vector = new Vector2d(1,3);
   *
   * // Our vector looks like this
   * // { x: 1, y: 3 }
   *
   * // Lets multiply 2 to all values
   * let result = vector.multiply(2);
   *
   * // Our resulting vector now looks like this
   * // { x: 2, y: 6 }
   *
   * console.log(result.toObject())
   *
   * @param {number|Vector2d} n Add a number to the matrix or add a an other Matrix object
   * @returns {Vector2d}
   */
  multiply (n) {
    if (n instanceof Vector2d) {
      this.x *= n.x
      this.y *= n.y
    } else {
      this.x *= n
      this.y *= n
    }
    return this
  }

  /**
   * Get the current x value
   *
   * @returns {integer}
   */
  getX () {
    return this.x
  }

  /**
   * Get the current y value
   *
   * @returns {integer}
   */
  getY () {
    return this.y
  }

}

if (typeof module !== 'undefined') {
  module.exports = Vector2d
}