define(['core/Scene', 'core/input/KeyboardInput'], function (Scene, KeyboardInput) {

  /**
   * @classdesc Level
   * @exports  core/Level
   * @class
   */
  let Level = function (options) {
    Scene.call(this, options)

    /**
     * Holder for registered KeyboardInput.
     *
     * @type {Array}
     */
    this.keyboardKeys = []

    /**
     * Start listening for events.
     */
    this.on('mousemove', this.onMouseMove)
    this.on('pointerdown', this.onPointerDown)
    this.on('pointerup', this.onPointerUp)
  }

  extend(Level, Scene)

  /**
   * Add keyboard inputs to listen to.
   *
   * @example
   * this.listenForKeyboardInputs('w', 'a', 's', 'd')
   *
   * @param {string} keys - The keys to listen for
   */
  Level.prototype.listenForKeyboardInputs = function (...keys) {
    let self = this
    keys.forEach(function (key) {
      let info = new KeyboardInput(key)

      info.down = self.onKeyDown.bind(self)
      info.up = self.onKeyUp.bind(self)

      self.keyboardKeys.push(info)
    })
  }

  /**
   * Callback for the onKeyPress even. You can overwrite this your self
   * to receive the onKeyPress call.
   */
  Level.prototype.onKeyPress = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyPress events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
     * for more information.
     */
  }

  /**
   * Callback for the onKeyDown even. You can overwrite this your self
   * to receive the onKeyDown call.
   */
  Level.prototype.onKeyDown = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard onKeyDown events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
     * for more information.
     */
  }

  /**
   * Callback for the onKeyUp even. You can overwrite this your self
   * to receive the onKeyUp call.
   */
  Level.prototype.onKeyUp = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyUp events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
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