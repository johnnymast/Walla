define(['eventemitter'], function (EventEmitter) {
  let Axis = function (axis, index = 0) {
    EventEmitter.call(this)

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

  extend(Axis, EventEmitter)

  /**
   * Return the Axis index number.
   *
   * @returns {number}
   */
  Axis.prototype.getIndex = function () {
    return this.index
  }

  /**
   * Applies the `threshold` value to the axis and returns it.
   *
   * @return {number} The axis value, adjusted for the movement threshold.
   */
  Axis.prototype.getValue = function () {
    return (Math.abs(this.value) < this.threshold) ? 0 : this.value
  }

  /**
   * Update the Axis object.
   *
   * @param {number} value - The axis movement value.
   */
  Axis.prototype.update = function (value) {
    this.value = value
  }

  return Axis
})