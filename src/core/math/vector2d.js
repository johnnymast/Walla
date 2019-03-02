/**
 * @namespace Math
 */

// info https://www.intmath.com/vectors/4-adding-vectors-2-dimensions.php

/**
 * Class for Vector2d math calculations.
 *
 * @class
 */
class Vector2d {
  /**
   * @param {number} [x=0] - the x value
   * @param {number} [y=0] - the y value
   */
  constructor (x = 0, y = 0) {
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
   * @returns {object}
   */
  toObject () {
    return {x: this.x, y: this.y}
  }

  /**
   * Clone the vector into a new Vector2d object.
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
   * @param {number|Vector2d} n - add a number to the vector or add a an other Vector2d object
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
   * @param {number|Vector2d} n - subtract a number to the vector or subtract a an other Vector2d object
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
   * @param {number|Vector2d} n - multiply a number to the vector or multiply a an other Vector2d object
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
   * Calculate the distance to an other vector.
   *
   * @see https://www.calculatorsoup.com/calculators/geometry-plane/distance-two-points.php
   * @example
   *
   * let v1 = new Vector2d(6, 3)
   * let v2 = new Vector2d(10, 12)
   *
   * // v1 should look like { x: 6, y: 3 }
   * // v2 should look like { x: 10, y: 12 }
   *
   * let distance = v1.distanceTo(v2)
   *
   * // Output should be 9.848857801796104
   * console.log(distance)
   *
   * @param {Vector2d} vector - calculate the distance to this vector
   * @returns {number}
   */
  distanceTo (vector) {
    if (vector instanceof Vector2d) {
      return this.subtract(vector).magnitude()
    } else {
      throw new Error('distanceTo: Argument is not an instance of Vector2d')
    }
  }

  /**
   * Get the dot product of 2 vectors.
   *
   * @example
   *
   * let v1 = new Vector2d(2, 3)
   * let v2 = new Vector2d(4, 12)
   *
   * // v1 should look like {x: 2, y: 3}
   * // v2 should look like {x: 4, y: 12}
   *
   * let result = v1.dot(v2)
   *
   * // Output should be 44
   * console.log(result)
   *
   * @param {Vector2d} [n=null] - the other vector to calculate the dot product with.
   * @returns {number}
   */
  dot (n) {
    if (n instanceof Vector2d) {
      return (this.x * n.x + this.y * n.y)
    } else {
      throw new error('Dot: Argument error, argument is not an instance of Vector2d')
    }
  }

  /**
   * Return a normalized version of the vector.
   *
   * @see http://www.fundza.com/vectors/normalize/
   * @example
   *
   * let vector = new Vector2d(3, 1)
   *
   * // vector should look like {x: 3, y: 1}
   *
   * let result = vector.normalize()
   *
   * // this should output {x: 0.9486832980505138, y: 0.31622776601683794}
   * console.log(result)
   *
   * @returns {Vector2d}
   */
  normalize () {
    let magnitude = this.magnitude()

    let x = this.x / magnitude
    let y = this.y / magnitude

    return new Vector2d(x, y)
  }

  /**
   * Return the radian value of this vector.
   *
   * @returns {number}
   */
  radians () {
    return Math.atan(this.y / this.x)
  }

  /**
   * Return the degrees value of this vector.
   *
   * @returns {number}
   */
  degrees () {
    return this.radians() *(180/Math.PI)
  }

  /**
   * @example
   *
   *  let vector = new Vector2d(8,8);
   *
   *  // Our vector looks like this
   *  // { x: 8, y: 8 }
   *
   *  let result = v.devide(2)
   *
   *  // Our resulting vector now looks like this
   *  // { x: 4, y: 4 }
   *
   *  console.log(result.toObject())
   *
   * @param {number|Vector2d} n - devide a number on the vector or devide a an other Vector3d object
   * @returns {Vector3d}
   */
  devide (n) {
    if (n instanceof Vector2d) {
      this.x /= n.x
      this.y /= n.y
    } else {
      this.x /= n
      this.y /= n
    }
    return this
  }

  /**
   * Returns the magnitude of the vector.
   * V(x*x + y+y)
   *
   * @example
   * let vector = Vector2d(6, 3);
   *
   * // Our vector looks like this
   * // { x: 6, y: 3 }
   *
   * // Lets get the magnitude
   * let result = vector.magnitude();
   *
   * // The output should be 6.708203932499369
   * console.log(result)
   *
   * @returns {number}
   */
  magnitude () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

  /**
   * Get the current x value
   *
   * @returns {number}
   */
  getX () {
    return this.x
  }

  /**
   * Get the current y value
   *
   * @returns {number}
   */
  getY () {
    return this.y
  }

}

if (typeof module !== 'undefined') {
  module.exports = Vector2d
}
