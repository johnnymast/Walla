/**
 * @namespace Math
 */

/**
 * Class for Matrix math calculations. Please be aware
 * of the fact that the rows and columns start of by 0 and
 * not at 1.
 *
 * @class
 */
class Matrix {

  /* Instantiate a new Matrix Object.
   *
   * @constructor
   * @param {number} rows The number of rows in the matrix
   * @param {number} cols The number of columns in the matrix
   * @param {number} [fill=0] The initial fill for the matrix
   */
  constructor (rows = 0, cols = 0, fill = 0) {
    this.rows = rows
    this.cols = cols
    this.fill = fill
    this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(this.fill))
  }

  /**
   * Get the matrix data.
   * @example
   * let matrix = new Matrix(4,4, 2);
   *
   * // this will output
   * // [ [ 2, 2, 2, 2 ], [ 2, 2, 2, 2 ], [ 2, 2, 2, 2 ], [ 2, 2, 2, 2 ] ]
   * console.log(matrix.valueOf())
   *
   * @returns {Array}
   */
  valueOf () {
    return this.data
  }

  /**
   * Clone the matrix into a new Matrix object.
   *
   * @returns {Matrix}
   */
  clone () {
    let clone = new Matrix(this.rows, this.cols, this.fill)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        clone.data[i][j] = this.data[i][j]
      }
    }
    return clone
  }

  /**
   * Set the value inside the matrix
   *
   * @example
   * let matrix = new Matrix(1,1, 1);
   * matrix.setValue(0, 0, 2)
   * matrix.setValue(0, 1, 3)
   *
   * // Our matrix now looks like
   * // [ [ 1, 2, 3 ] ]
   *
   * // This will return
   * // [ [ 2, 4, 6 ] ]
   *
   * console.table(matrix.valueOf())
   *
   * @param {number} row The row on which to set the value
   * @param {number} col The column on which to set the value
   * @param {number} value The value to set on the coordinates
   * @returns {Matrix} The matrix object it self
   */
  setValue (row, col, value) {
    this.data[row][col] = value
    return this
  }

  /**
   * Return a value stored in the Matrix at row and column
   *
   * @example
   * let matrix = new Matrix(1,1, 10);
   * matrix.setValue(0, 0, 9)
   * matrix.setValue(0, 1, 8)
   *
   * // Our matrix looks like this
   * // [ [ 9, 8 ] ]
   *
   * // This will output 8
   * console.log(matrix.valueAt(0, 1))
   *
   * @param {number} row The row on which to get the value
   * @param {number} col The column on which to get the value
   * @returns {number} value at this position
   */
  valueAt (row, col) {
    return this.data[row][col]
  }

  /**
   * @example
   * let matrix = new Matrix(1,3, 0);
   * matrix.add(1)
   *
   * // Our matrix looks like this
   * // [ [ 1, 1, 1 ] ]
   *
   * // Lets add 2 to all values
   * let result = matrix.add(2);
   *
   * // Our resulting matrix now looks like this
   * // [ [ 3, 3, 3 ] ]
   *
   * console.table(result.valueOf())
   *
   * @param {number|Matrix} n Add a number to the matrix or add a an other Matrix object
   * @returns {Matrix}
   */
  add (n) {

    if (n instanceof Matrix) {
      if (n.rows !== this.rows || n.cols !== this.cols) {
        throw 'Cannot add matrices together that don\'t share the same size.'
      }

      let src = n

      for (let i = 0; i < src.rows; i++) {
        for (let j = 0; j < src.cols; j++) {
          this.data[i][j] += n.data[i][j]
        }
      }

    } else {
      for (let i = 0; i < this.rows; i++) {
        this.data[i] = this.data[i].map((v) => v + n)
      }
    }
    return this
  }

  /**
   * @example
   * let matrix = new Matrix(1,3);
   * matrix.setValue(0, 0, 1)
   * .setValue(0, 1, 2)
   * .setValue(0, 2, 3)
   *
   * // Our matrix looks like this
   * // [ [ 1, 2, 3 ] ]
   *
   * // Lets add 2 to all values
   * let result = matrix.add(2);
   *
   * // Our resulting matrix now looks like this
   * // [ [ 3, 4, 5 ] ]
   *
   * console.table(result.valueOf())
   *
   * @param {number|Matrix} n Add a number to the matrix or add a an other Matrix object
   * @returns {Matrix}
   */
  subtract (n) {
    if (n instanceof Matrix) {
      if (n.rows !== this.rows || n.cols !== this.cols) {
        throw 'Cannot subtract matrices from each other that don\'t share the same size.'
      }

      let src = n

      for (let i = 0; i < src.rows; i++) {
        for (let j = 0; j < src.cols; j++) {
          this.data[i][j] -= n.data[i][j]
        }
      }

    } else {
      for (let i = 0; i < this.rows; i++) {
        this.data[i] = this.data[i].map((v) => v - n)
      }
    }
    return this
  }

  /**
   * @example
   * let matrix = new Matrix(1,3);
   * matrix.setValue(0, 0, 1)
   * .setValue(0, 1, 2)
   * .setValue(0, 2, 3)
   *
   * // Our matrix looks like this
   * // [ [ 1, 2, 3 ] ]
   *
   * // Lets add 2 to all values
   * let result = matrix.multiply(2);
   *
   * // Our resulting matrix now looks like this
   * // [ [ 2, 4, 6 ] ]
   *
   * console.table(result.valueOf())
   *
   * @param {number|Matrix} n Add a number to the matrix or add a an other Matrix object
   * @returns {Matrix}
   */
  multiply (n) {
    if (n instanceof Matrix) {
      if (n.rows !== this.rows || n.cols !== this.cols) {
        throw 'Cannot multiply matrices with each other that don\'t share the same size.'
      }

      let src = n

      for (let i = 0; i < src.rows; i++) {
        for (let j = 0; j < src.cols; j++) {
          this.data[i][j] *= n.data[i][j]
        }
      }

    } else {
      for (let i = 0; i < this.rows; i++) {
        this.data[i] = this.data[i].map((v) => v * n)
      }
    }
    return this
  }
}

if (typeof module !== 'undefined') {
  module.exports = Matrix
}