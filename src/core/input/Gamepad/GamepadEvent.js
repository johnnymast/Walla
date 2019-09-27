/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

/**
 * Prophecy GamepadEvent class.
 *
 * @class GamepadEvent
 */
class GamepadEvent {

  /**
   * GamepadEvent class
   * @param {GamePad} gamepad - The Prophecy object.
   * @param {Button} button - The Prophecy button object.
   * @constructor
   */
  constructor (gamepad, button) {

    /**
     * Reference to the GamePad.
     * @type {GamePad}
     */
    this.gamepad = gamepad

    /**
     * Reference to the Button.
     * @type {Button}
     */
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
