define(['eventemitter'], function (EventEmitter) {
  let Axis = function(axis) {
    EventEmitter.call(this)
    this.axis = axis
    console.log(axis)

    /**
     * Movement tolerance threshold below which axis values are ignored in `getValue`.
     *
     * @name Phaser.Input.Gamepad.Axis#threshold
     * @type {number}
     * @default 0.1
     * @since 3.0.0
     */
    this.threshold = 0.1;
  }

  extend(Axis, EventEmitter)

  /**
   * Applies the `threshold` value to the axis and returns it.
   *
   * @method Phaser.Input.Gamepad.Axis#getValue
   * @since 3.0.0
   *
   * @return {number} The axis value, adjusted for the movement threshold.
   */
  Axis.prototype.getValue = function ()
  {
    return (Math.abs(this.value) < this.threshold) ? 0 : this.value;
  }

  /**
   * Update the Axis object.
   *
   * @param {number} delta - Time passed since last update
   */
  Axis.prototype.update = function(delta) {

    this.value = this.axis
  }

  return Axis
})