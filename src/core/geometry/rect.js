/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

/**
 * Rect class
 * @class PIXI.Geometry.Rect
 */
class Rect {

  /**
   * Rect constructor.
   *
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   * @param {number} [width=0] - width of the rect
   * @param {number} [height=0] - height of the rect
   * @constructor
   */
  constructor (x = 0, y = 0, width = 0, height = 0) {

    /**
     *
     * @type {number}
     * @default = 0
     */
    this.x = x

    /**
     *
     * @type {number}
     * @default = 0
     */
    this.y = y

    /**
     *
     * @type {number}
     * @default = 0
     */
    this.width = width

    /**
     *
     * @type {number}
     * @default = 0
     */
    this.height = height
  }

  /**
   * Clone the current Rect.
   *
   * @returns {Rect}
   */
  clone () {
    return new Rect(this.x, this.y, this.width, this.height)
  }

  /**
   * Copy the values of rect onto the current Rect.
   *
   * @param {Rect} rect - The rect to copy
   */
  copy (rect) {
    this.set(rect.x, rect.y, rect.width, rect.height)
  }

  /**
   * Compare the given Rect to this Rect.
   *
   * @param {Rect} rect - Compare this Rect to the passed Rect
   * @returns {boolean}
   */
  equals (rect) {
    return (rect.x === this.x && rect.y === this.y && rect.width === this.width && rect.height === this.height)
  }

  /**
   * Sets the rect to a new x and y position.
   * If height is omitted, both width and height will be set to width.
   *
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   * @param {number} [width=0] - width of the rect
   * @param {number} [height=0] - height of the rect
   */
  set (x, y, width, height) {

    this.x = x || 0
    this.y = y

    this.width = width
    this.height = height || ((height !== 0) ? this.width : 0)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Rect
}