/**
 * @namespace Math
 */

/**
 * Class for Vector3d math calculations.
 *
 * @class
 */
class Vector3d {

  /**
   * @param {number} [x=0] - the x value
   * @param {number} [y=0] - the y value
   * @param {number} [z=0] - the z value
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
   * @example
   *
   *  let v = new Vector3d(4, 4, 2)
   *
   *  // Our vector looks like this
   *  // { x: 4, y: 4, z: 2 }
   *
   *  let result = v.devide(2)
   *
   *  // Our resulting vector now looks like this
   *  // { x: 2, y: 2, z: 1 }
   *
   *  console.log(result.toObject())
   *
   * @param {number|Vector3d} n - devide a number on the vector or devide a an other Vector3d object
   * @returns {Vector3d}
   */
  devide (n) {
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
  getZ() {
    return this.z
  }
}

if (typeof module !== 'undefined') {
  module.exports = Vector3d
}