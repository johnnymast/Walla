/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const GamepadEvent = require('core/input/Gamepad/GamepadEvent')
const PIXI = require('pixi')

/**
 * Button class for Gamepad.
 * @extends PIXI.utils.EventEmitter
 * @class Button
 */
class Button extends PIXI.utils.EventEmitter {

  /**
   * Button constructor.
   * @param {GamepadButton} button - The Button object for this GamePad.
   * @param {number} index - The index of this GamePad
   * @param {GamePad} controller - The GamePad this button is connected to.
   * @constructor
   */
  constructor (button, index = 0, controller) {
    super()

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
    this.controller = controller

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

  /**
   * Return the gamepad the button is on.
   *
   * @returns {Gamepad}
   */
  getGamePad () {
    return this.controller.gamepad
  }

  /**
   * Return the button number.
   *
   * @returns {number}
   */
  getIndex () {
    return this.index
  }

  /**
   * Return the percentage pushed in a range from 0 to 1.
   *
   * @returns {number}
   */
  getValue () {
    return this.button.value
  }

  /**
   * Check to see if the button is down.
   *
   * @returns {boolean}
   */
  isDown () {
    return (this.getValue() > 0)
  }

  /**
   * Poll the Gamepad for the latest information.
   * @private
   */
  _poll () {
    this.button = this.getGamePad().buttons[this.index]
  }

  /**
   * Update the button object.
   */
  update () {
    this._poll()

    if (this.button.pressed || this.button.touched) {
      this.emit('GamePad.button.pressed', new GamepadEvent(this.getGamePad(), this))
    }

    this.value = this.button.value
  }
}

module.exports = Button