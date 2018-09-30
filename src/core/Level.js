define(['core/Scene', 'core/input/KeyboardInput'], function (Scene, KeyboardInput) {

  /**
   * @classdesc Level
   * @exports  core/Level
   * @class
   */
  let Level = function (options) {
    Scene.call(this, options)

    /**
     * Start listening for events.
     */
    this.on('mousemove', this.onMouseMove)
    this.on('pointerdown', this.onPointerDown)
    this.on('pointerup', this.onPointerUp)

    this.InputManager.on('InputManager.keyDown', this.onKeyDown.bind(this))
    this.InputManager.on('InputManager.keyUp', this.onKeyUp.bind(this))
  }

  extend(Level, Scene)

  /**
   * Callback for the onKeyPress even. You can overwrite this your self
   * to receive the onKeyPress call.
   *
   * @param {KeyboardEvent} event - the keyboard event
   */
  Level.prototype.onKeyPress = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyPress events.
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
  Level.prototype.onKeyDown = function (event) {
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
  Level.prototype.onKeyUp = function (event) {
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
   */
  Level.prototype.onMouseMove = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive mouse move events.
     */
  }

  /**
   * Callback for the onPointerDown even. You can overwrite this your self
   * to receive the onPointerDown call.
   */
  Level.prototype.onPointerDown = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive pointer down events.
     */
  }

  /**
   * Callback for the onPointerUp even. You can overwrite this your self
   * to receive the onPointerUp call.
   */
  Level.prototype.onPointerUp = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive pointer up events.
     */
  }

  /**
   * Callback for the onStart even. You can overwrite this your self
   * to receive the onStart call.
   */
  Level.prototype.onStart = function () {
    /**
     * You can overwrite this function if you wish
     * to receive onStart up events.
     */
  }

  return Level
})