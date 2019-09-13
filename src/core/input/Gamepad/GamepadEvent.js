class GamepadEvent {
  constructor (gamepad, button) {
    this.gamepad = gamepad
    this.button = button
  }

  /**
   * Return the parent GamePad.
   *
   * @returns {*|Gamepad}
   */
  getGamepad () {
    return this.gamepad
  }

  /**
   * Return the pressed button.
   *
   * @returns {*}
   */
  getButton () {
    return this.button
  }
}

module.exports = GamepadEvent
