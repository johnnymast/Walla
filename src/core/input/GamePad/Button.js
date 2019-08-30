define(['eventemitter', 'input/Gamepad/GamepadEvent'], function (EventEmitter, GamepadEvent) {
  let Button = function (button, index = 0, controler) {
    EventEmitter.call(this)

    /**
     * Reference to the GamePadButton on the
     * Gamepad API.
     *
     * @type {GamepadButton}
     */
    this.button = button

    /**
     * The identifier for this button.
     *
     * @type {string}
     */
    this.id = `Button${index}`

    /**
     * Reference to the button number on the gamepad.
     *
     * @type {number}
     */
    this.index = index

    /**
     * Reference to the controlling Gamepad.
     *
     * @type {Gamepad}
     */
    this.controler = controler

    /**
     * If supported this number will represent how far the button
     * is pushed. The RFC says if the controller does not support percentage
     * pushed at least it should be 1 for pressed and 0 for not pushed.
     *
     * @type {number}
     * @default 0
     */
    this.value = button.value

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
   * Return the gamepad the button is on.
   *
   * @returns {Gamepad}
   */
  Button.prototype.getGamePad = function () {
    return this.controler.gamepad
  }

  /**
   * Return the button number.
   *
   * @returns {number}
   */
  Button.prototype.getIndex = function () {
    return this.index
  }

  /**
   * Return the percentage pushed in a range from 0 to 1.
   *
   * @returns {number}
   */
  Button.prototype.getValue = function () {
    return this.button.value
  }

  Button.prototype.isDown = function () {
    return (this.getValue() > 0)
  }

  /**
   * Poll the Gamepad for the latest information.
   * @private
   */
  Button.prototype._poll = function () {
    this.button = this.getGamePad().buttons[this.index]
  }

  /**
   * Update the button object.
   */
  Button.prototype.update = function () {
    this._poll();

    if (this.button.pressed || this.button.touched) {
      this.emit('GamePad.button.pressed', new GamepadEvent(this.getGamePad(), this))
    }

    this.value = this.button.value
  }

  return Button
})
