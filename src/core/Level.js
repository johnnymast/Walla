const KeyboardInput = require('core/input/Keyboard/KeyboardInput')
const Scene = require('core/Scene')

class Level extends Scene {
  constructor (options) {
    super(options)

    /**
     * Start listening for events.
     */
    this.on('mousemove', this.onMouseMove)
    this.on('pointerdown', this.onPointerDown)
    this.on('pointerup', this.onPointerUp)

    this.InputManager.on('InputManager.GamepadButtonPressed', this.onGamepadButtonDown.bind(this))
    this.InputManager.on('InputManager.keyDown', this.onKeyDown.bind(this))
    this.InputManager.on('InputManager.keyUp', this.onKeyUp.bind(this))
  }

  /**
   * Callback for the onButtonDown even. You can overwrite this your self
   * to receive the onButtonDown call.
   *
   * @param {GamepadEvent} event - the gamepad event
   */
  onGamepadButtonDown (event) {
    /**
     * You can overwrite this function if you wish
     * to receive gamepad onButtonDown events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See InputManager.mapInput
     * for more information.
     */
  }

  /**
   * Callback for the onKeyDown even. You can overwrite this your self
   * to receive the onKeyDown call.
   *
   * @param {KeyboardEvent} event - the keyboard event
   */
  onKeyDown (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard onKeyDown events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See InputManager.mapInput
     * for more information.
     */
  }

  /**
   * Callback for the onKeyUp even. You can overwrite this your self
   * to receive the onKeyUp call.
   *
   * @param {KeyboardEvent} event - the keyboard event
   */
  onKeyUp (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyUp events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See InputManager.mapInput
     * for more information.
     */
  }

  /**
   * Callback for the onMouseMove even. You can overwrite this your self
   * to receive the onMouseMove call.
   *
   * @param {Event} event - The mouse event
   */
  onMouseMove (event) {
    /**
     * You can overwrite this function if you wish
     * to receive mouse move events.
     */
  }

  /**
   * Callback for the onPointerDown even. You can overwrite this your self
   * to receive the onPointerDown call.
   *
   * @param {Event} event - The mouse event
   */
  onPointerDown (event) {
    /**
     * You can overwrite this function if you wish
     * to receive pointer down events.
     */
  }

  /**
   * Callback for the onPointerUp even. You can overwrite this your self
   * to receive the onPointerUp call.
   *
   * @param {Event} event - The mouse event
   */
  onPointerUp (event) {
    /**
     * You can overwrite this function if you wish
     * to receive pointer up events.
     */
  }

  /**
   * Callback for the onStart even. You can overwrite this your self
   * to receive the onStart call.
   */
  onStart () {
    /**
     * You can overwrite this function if you wish
     * to receive onStart up events.
     */
  }
}

module.exports = Level