/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

// info https://www.intmath.com/vectors/4-adding-vectors-2-dimensions.php

/**
 * Class for Vector3d math calculations.
 *
 * @class Prophecy.Math.Vector3d
 */
class Vector3d {

  /**
   * @param {number} [x=0] - the x value
   * @param {number} [y=0] - the y value
   * @param {number} [z=0] - the z value
   * @constructor
   */
  constructor (x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  /**
   * @example
   * let v = new Vector3d(2, 5, 2)
   *
   * // Our vector looks like this
   * // { x: 2, y: 5, z: 2 }
   *
   * // Lets add 2 to all values
   * let result = v.add(2)
   *
   * // Our resulting vector now looks like this
   * // { x: 4, y: 7, z: 4 }
   *
   * console.log(result.toObject())
   *
   * @returns {object}
   */
  toObject () {
    return {x: this.x, y: this.y, z: this.z}
  }

  /**
   * Clone the vector into a new Vector3d object.
   *
   * @returns {Vector3d}
   */
  clone () {
    return new Vector3d(this.x, this.y, this.z)
  }

  // element wise

  /**
   * @example
   * let vector = new Vector3d(1,3, 9);
   *
   * // Our vector looks like this
   * // { x: 1, y: 3, z: 9 }
   *
   * // Lets add 2 to all values
   * let result = vector.add(2);
   *
   * // Our resulting vector now looks like this
   * // { x: 2, y: 6, z: 11 }
   *
   * console.log(result.toObject())
   *
   * @param {number|Vector3d} n - add a number to the vector or add an other Vector3d object
   * @returns {Vector3d}
   */
  add (n) {
    if (n instanceof Vector3d) {
      this.x += n.x
      this.y += n.y
      this.z += n.z
    } else {
      this.x += n
      this.y += n
      this.z += n
    }
    return this
  }

  /**
   * @example
   * let vector = new Vector3d(1,3, 9);
   *
   * // Our vector looks like this
   * // { x: 1, y: 3, z: 9 }
   *
   * // Lets subtract 2 to all values
   * let result = vector.subtract(2);
   *
   * // Our resulting vector now looks like this
   * // { x: -1, y: 1, z: 7 }
   *
   * console.log(result.toObject())
   *
   * @param {number|Vector3d} n - subtract a number to the vector or subtract a an other Vector3d object
   * @returns {Vector3d}
   */
  subtract (n) {
    if (n instanceof Vector3d) {
      this.x -= n.x
      this.y -= n.y
      this.z -= n.z
    } else {
      this.x -= n
      this.y -= n
      this.z -= n
    }
    return this
  }

  /**
   * @example
   * let vector = new Vector3d(1,3,4);
   *
   * // Our vector looks like this
   * // { x: 1, y: 3, z: 4 }
   *
   * // Lets multiply 2 to all values
   * let result = vector.multiply(2);
   *
   * // Our resulting vector now looks like this
   * // { x: 2, y: 6, z: 8 }
   *
   * console.log(result.toObject())
   *
   * @param {number|Vector3d} n - multiply a number to the vector or multiply a an other Vector3d object
   * @returns {Vector3d}
   */
  multiply (n) {
    if (n instanceof Vector3d) {
      this.x *= n.x
      this.y *= n.y
      this.z *= n.z
    } else {
      this.x *= n
      this.y *= n
      this.z *= n
    }
    return this
  }

  /**
   * Calculate the distance to an other vector.
   *
   * @see https://www.calculatorsoup.com/calculators/geometry-plane/distance-two-points.php
   * @example
   *
   * let v1 = new Vector3d(6, 3, 2)
   * let v2 = new Vector3d(10, 12, 9)
   *
   * // v1 should look like { x: 6, y: 3, z: 2}
   * // v2 should look like { x: 10, y: 12, z: 9 }
   *
   * let distance = v1.distanceTo(v2)
   *
   * // Output should be 9.848857801796104
   * console.log(distance)
   *
   * @param {Vector3d} vector - calculate the distance to this vector
   * @returns {number}
   */
  distanceTo (vector) {
    if (vector instanceof Vector3d) {
      return this.subtract(vector).magnitude()
    } else {
      throw new Error('distanceTo: Argument is not an instance of Vector3d')
    }
  }

  /**
   * Get the dot product of 2 vectors.
   *
   * @example
   *
   * let v1 = new Vector3d(2, 3, 4)
   * let v2 = new Vector3d(4, 12, 8)
   *
   * // v1 should look like {x: 2, y: 3, z: 4}
   * // v2 should look like {x: 4, y: 12, z: 8}
   *
   * let result = v1.dot(v2)
   *
   * // Output should be 76
   * console.log(result)
   *
   * @param {Vector3d} [n=null] - the other vector to calculate the dot product with.
   * @returns {number}
   */
  dot (n) {
    if (n instanceof Vector3d) {
      return (this.x * n.x + this.y * n.y + this.z * n.z);
    } else {
      throw new error('Dot: Argument error, argument is not an instance of Vector3d')
    }
  }

  /**
   * @example
   *
   *  let v = new Vector3d(4, 4, 2)
   *
   *  // Our vector looks like this
   *  // { x: 4, y: 4, z: 2 }
   *
   *  let result = v.divide(2)
   *
   *  // Our resulting vector now looks like this
   *  // { x: 2, y: 2, z: 1 }
   *
   *  console.log(result.toObject())
   *
   * @param {number|Vector3d} n - divide a number on the vector or divide a an other Vector3d object
   * @returns {Vector3d}
   */
  divide (n) {
    if (n instanceof Vector3d) {
      this.x /= n.x
      this.y /= n.y
      this.z /= n.z
    } else {
      this.x /= n
      this.y /= n
      this.z /= n
    }
    return this
  }

  /**
   * Returns the magnitude of the vector.
   * V(x*x + y+y)
   *
   * @example
   * let vector = Vector3d(2, 3, 5);
   *
   * // Our vector looks like this
   * // { x: 2, y: 3, z: 5 }
   *
   * // Lets get the magnitude
   * let result = vector.magnitude();
   *
   * // The output should be 6.164414002968976
   * console.log(result)
   *
   * @returns {number}
   */
  magnitude () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2))
  }

  /**
   * Return a normalized version of the vector.
   *
   * @see http://www.fundza.com/vectors/normalize/
   * @example
   *
   * let vector = new Vector3d(3, 1, 2)
   *
   * // vector should look like {x: 3, y: 1, z: 2}
   *
   * let result = vector.normalize()
   *
   * // this should output {x: 0.8017837257372732, y: 0.2672612419124244, z: 0.5345224838248488}
   * console.log(result)
   *
   * @returns {Vector3d}
   */
  normalize () {
    let magnitude = this.magnitude()

    let x = this.x / magnitude
    let y = this.y / magnitude
    let z = this.z / magnitude

    return new Vector3d(x, y, z)
  }

  /**
   * Linearly interpolates between 2 points.
   *
   * @see https://github.com/processing/p5.js/blob/0.9.0/src/math/p5.Vector.js#L12
   * @example
   *
   * let v = new Vector3d(0, 0, 0)
   * let v2 = v.lerp(100, 100, 100, 0.5)
   *
   * this should output {x: 50, y: 50, z: 50}
   * console.log(v2)
   *
   * @param {number} [x=0] - the x value.
   * @param {number} [y=0] - the y value.
   * @param {number} [z=0] - the z value.
   * @param {number} [amt=0] - the distance
   */
  lerp (x = 0, y = 0, z = 0, amt = 0) {
    this.x += (x - this.x) * amt || 0
    this.y += (y - this.y) * amt || 0
    this.z += (z - this.z) * amt || 0
    return this
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

  /**
   * Get the current z value
   *
   * @returns {number}
   */
  getZ () {
    return this.z
  }
}

if (typeof module !== 'undefined') {
  module.exports = Vector3d
}