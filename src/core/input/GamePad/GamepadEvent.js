define([], function () {
    let GamepadEvent = function (gamepad, button) {
      this.gamepad = gamepad
      this.button = button
    }

    /**
     * Return the parent GamePad.
     *
     * @returns {*|Gamepad}
     */
    GamepadEvent.prototype.getGamepad = function () {
      return this.gamepad
    }

    /**
     * Return the pressed button.
     *
     * @returns {*}
     */
    GamepadEvent.prototype.getButton = function () {
      return this.button
    }

    return GamepadEvent
  }
)

module.exports = GamepadEvent