/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const ScenePlugin = require('core/ScenePlugin')
const GamePad = require('core/input/Gamepad/GamePad')

/**
 * GamePadInput class.
 * @extends ScenePlugin
 */
class GamePadInput extends ScenePlugin {

  /**
   * Take control over GamePad input by using this class.
   * You construct the class with a keycode.
   * See https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API#Browser_compatibility for more information.
   * See http://www.linux-usb.org/usb.ids
   * @exports core/input/GamePadInput
   * @module GamePadInput
   * @example
   *
   * Note: Internet explorer does not support this set of API's nor do mobile browsers :(
   *
   * // FIXME: TODO
   * @constructor
   */
  constructor () {
    super()

    /**
     * Array of connected gamepads
     *
     * @type {Array}
     */
    this.gamepads = []

    /**
     * Is GamePadInput enabled or not.
     * @type {boolean}
     */
    this.enabled = true

    /**
     * The callback function for when a gamepad is connected
     * or disconnected.
     *
     * @type {callback}
     */
    this.ch = this._connectionHandler.bind(this)

    /**
     * Automatically start listening.
     */
    this.startListeners()

    /**
     * Register the scene plugin.
     */
    this.SceneManager.registerPlugin('input-gamepad', this)
  }

  /**
   * Query if there are gamepad's connected to the system.
   *
   * @returns {boolean}
   */
  isConnected () {
    return (this.gamepads.length > 0)
  }

  /**
   * Return a single connected gamepad.
   *
   * @param {number} [index=1] - The index of the Input to get.
   * @returns {boolean|gamepad}
   */
  getGamepad (index = 1) {
    if (typeof this.gamepads[index] !== 'undefined') {
      return this.gamepads[index]
    }
    return false
  }

  /**
   * Return an array of registered gamepads.
   *
   * @returns {Array}
   */
  getGamePads () {
    return this.gamepads
  }

  /**
   * Start listening for game controller events.
   */
  startListeners () {
    window.addEventListener('gamepadconnected', this.ch, false)
    window.addEventListener('gamepaddisconnected', this.ch, false)
    this.enabled = true
  }

  /**
   * Stop listening for game controller events.
   */
  stopListeners () {
    window.removeEventListener('gamepadconnected', this.ch)
    window.removeEventListener('gamepaddisconnected', this.ch)
    this.enabled = false
  }

  /**
   * This function will be called if a gamepad is connected
   * or disconnected.
   *
   * @param {GamepadEvent} event - The connect/disconnect event.
   * @private
   */
  _connectionHandler (event) {
    let gamepad = event.gamepad

    if (gamepad) {
      if (event.type === 'gamepadconnected') {
        this.gamepads[event.gamepad.index] = new GamePad(gamepad)
        this.emit('gamepad_connected', this.gamepads[event.gamepad.index])
      } else {

        this.emit('gamepad_disconnected', this.gamepads[event.gamepad.index])
        this.gamepads.splice(event.gamepad.index, 1)
      }
    }
  }

  /**
   * Update the GamePad's and its subobjects.
   *
   * @param {number} delta - Time passed since last update
   */
  update (delta) {
    if (!this.enabled) {
      return
    }

    let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : [])

    for (let gamepad of gamepads) {
      if (gamepad) {
        if (typeof this.gamepads[gamepad.index] !== 'undefined') {
          this.gamepads[gamepad.index].update(delta)
        }
      }
    }
  }
}

module.exports = GamePadInput
