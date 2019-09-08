const PIXI = require('pixi')

class Axis extends PIXI.utils.EventEmitter {

  constructor (axis, index = 0) {
    super()

    /**
     * The identifier for this Axis.
     *
     * @type {string}
     */
    this.id = `Axis${index}`

    /**
     * Reference to the axis number on the gamepad.
     *
     * @type {number}
     */
    this.index = index

    /**
     * This is a value between -1 and 1. The RFC states
     * that all axis should be at lest 1 for full and 0 for no movement.
     *
     * Sample on X axis:
     *
     * full left: -1
     * Full right: 1
     * Centered: 0
     *
     * @type {number}
     * @default 0
     */
    this.value = 0

    /**
     * Movement tolerance threshold below which axis values are ignored in `getValue`.
     *
     * @type {number}
     * @default 0.1
     */
    this.threshold = 0.1
  }

  /**
   * Return the Axis index number.
   *
   * @returns {number}
   */
  getIndex () {
    return this.index
  }

  /**
   * Applies the `threshold` value to the axis and returns it.
   *
   * @return {number} The axis value, adjusted for the movement threshold.
   */
  getValue () {
    return (Math.abs(this.value) < this.threshold) ? 0 : this.value
  }

  /**
   * Update the Axis object.
   *
   * @param {number} value - The axis movement value.
   */
  update (value) {
    this.value = value
  }
}

module.exports = Axis