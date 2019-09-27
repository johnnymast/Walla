/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const Button = require('core/input/Gamepad/Button')
const Axis = require('core/input/Gamepad/Axis')
const PIXI = require('pixi')

/**
 * GamePad class
 * @extends PIXI.utils.EventEmitter
 * @class GamePad
 */
class GamePad extends PIXI.utils.EventEmitter {

  /**
   * GamePad constructor.
   * @param {Gamepad} gamepad - The HTML5 Gamepad object.
   * @constructor
   */
  constructor (gamepad) {
    super()

    this.gamepad = gamepad

    /**
     * The buttons available on this controller.
     *
     * @type {Array}
     */
    this.buttons = []

    /**
     * The axes present on this controller.
     *
     * @type {Array}
     */
    this.axes = []

    /**
     * The unique (string) identifier of this gamepad.
     *
     * @type {string}
     */
    this.id = gamepad.id

    /**
     * The native index number of this controller connected for
     * example gamepad 1 or gamepad 2.
     *
     * @type {number}
     */
    this.index = gamepad.index

    /**
     * This object will be available on modern browsers if the GamePad
     * supports a vibrating feature. Not all browsers implement this yet but
     * the mainline browsers do.
     *
     * @type {GamepadHapticActuator}
     */
    this.vibration = gamepad.vibrationActuator || null

    /**
     * This has no meaning yet according to the specs (RFC) this
     * value will always be 'standard'
     *
     * @type {GamepadMappingType}
     */
    this.mapping = gamepad.mapping

    let index = 0
    for (let button of gamepad.buttons) {
      let btn = new Button(button, index, this)
      this.buttons.push(btn)
      index++
    }

    index = 0
    for (let axle of gamepad.axes) {
      let axl = new Axis(index)
      this.axes.push(axl)
      index++
    }
  }

  /**
   * Return the GamePad buttons.
   *
   * @returns {Array}
   */
  getButtons () {
    return this.buttons
  }

  /**
   * Return the GamePad Axis.
   *
   * @returns {Array}
   */
  getAxis () {
    return this.axes
  }

  /**
   * Query the gamepad if it supports vibration or not.
   *
   * @returns {boolean}
   */
  supportsVibration () {
    return (this.vibration !== null)
  }

  /**
   * Return the mapped buttons.
   *
   * @returns {GamepadMappingType}
   */
  getMapping () {
    return this.mapping
  }

  /**
   * Vibrate the gamepad with a given effect.
   *
   * @param {object} effect - The vibration effect object.
   */
  vibrate (effect = null) {
    if (this.supportsVibration() === true && effect) {
      this.vibration.playEffect('dual-rumble', effect)
    }
  }

  /**
   * Poll the Gamepad for the latest information.
   * @private
   */
  _poll () {
    this.gamepad = navigator.getGamepads()[this.index]
  }

  /**
   * Update the GamePad object.
   *
   * @param {number} delta - Time passed since last update
   */
  update (delta) {
    this._poll()

    for (let button of this.buttons) {
      button.update(delta)
    }

    for (let axle of this.axes) {
      axle.update(this.gamepad.axes[axle.getIndex()])
    }
  }
}

module.exports = GamePad
