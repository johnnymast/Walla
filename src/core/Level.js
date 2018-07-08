define(['core/Scene', 'core/input/KeyboardInput'], function (Scene, KeyboardInput) {
  let Level = function (options) {
    Scene.call(this, options)

    this.keyboardKeys = []

    this.on('mousemove', this.onMouseMove)
    this.on('pointerdown', this.onPointerDown)
  }

  extend(Level, Scene)

  Level.prototype.listenForKeyboardInputs = function (...keys) {
    let self = this
    keys.forEach(function (key) {
      let info = new KeyboardInput(key)

      info.down = self.onKeyDown.bind(self)
      info.up = self.onKeyUp.bind(self)

      self.keyboardKeys.push(info)
    })
  }

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

  Level.prototype.onMouseMove = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive mouse move events.
     */
  }

  Level.prototype.onPointerDown = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive pointer down events.
     */
  }

  Level.prototype.onStart = function () {

  }

  return Level
})