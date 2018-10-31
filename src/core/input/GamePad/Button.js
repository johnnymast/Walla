define(['eventemitter'], function (EventEmitter) {
  let Button = function (button, index = 0) {
    EventEmitter.call(this)

    /**
     * Reference to the GamePadButton on the
     * Gamepad API.
     *
     * @type {GamepadButton}
     */
    this.button = button

    /**
     * If supported this number will represent how far the button
     * is pushed. The RFC says if the controller does not support percentage
     * pushed at least it should be 1 for pressed and 0 for not pushed.
     *
     * @type {number}
     * @default 0
     */
    this.value = button.value;

    /**
     * Reference to the button number on the gamepad.
     *
     * @type {number}
     * @default 0
     */
    this.index = index
  }

  extend(Button, EventEmitter)

  /**
   * Return the button number.
   *
   * @returns {number}
   */
  Button.prototype.getIndex = function() {
    return this.index
  }

  /**
   * Return the percentage pushed in a range from 0 to 1.
   *
   * @returns {number}
   */
  Button.prototype.getValue = function () {
    return this.value
  }

  /**
   * Update the button object.
   *
   * @param {number} delta - Time passed since last update
   */
  Button.prototype.update = function (delta) {
    if (this.button.pressed) {
      this.emit('GamePadInput:pressed', this)
    }

    this.value = this.button.value;
  }

  return Button
})
