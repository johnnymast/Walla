/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

/**
 * Size class
 * @class Prophecy.Geometry.Size
 */
class Size {
  constructor (width, height) {
    this.width = width || 0
    this.height = height || 0
  }

  /**
   * Clone the current Size.
   * @returns {Size}
   */
  clone () {
    return new Size(this.width, this.height)
  }

  /**
   * Copy the values of size onto the current Size.
   * @param {Size} size - The size to copy
   */
  copy (size) {
    this.set(size.width, size.height)
  }

  /**
   * Compare the given Size to this Size.
   *
   * @param {Size} size - Compare this Size to the passed Size
   * @returns {boolean}
   */
  equals (size) {
    return (size.width === this.width && size.height === this.height)
  }

  /**
   * Sets the size to a new width and height position.
   * @param {number} [width=0] - width of the size
   * @param {number} [height=0] - height of the size
   */
  set (width, height) {
    this.width = width || 0
    this.height = height || 0
  }

  /**
   * Returns the half width of the object.
   * @returns {number}
   */
  get halfwidth () {
    return this.width / 2
  }

  /**
   * Returns the half height of the object.
   * @returns {number}
   */
  get halfheight () {
    return this.height / 2
  }
}

module.exports = Size