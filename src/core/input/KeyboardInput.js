define([], function () {

  /**
   * Take controle over Keyboard input by using this class.
   * You construct the class with a keycode.
   * See http://keycode.info/ for more information.
   * @exports core/input/KeyboardInput
   * @module KeyboardInput
   * @example
   * let char = 32 // spacebar
   * const space = new KeyboardInput(char)
   * space.press = function() {
   *  console.log('spacebar pressed')
   * }
   * space.release = function() {
   *     console.log('spacebar released')
   * }
   * @constructor
   * @param {number} keyCode - The keycode to listen for
   */
  let KeyboardInput = function (key) {

    let info = {}
    info.key = key
    info.isDown = false
    info.isUp = true
    info.down = undefined
    info.up = undefined

    window.addEventListener(
      'keydown', this.downHandler.bind(info), false
    )

    window.addEventListener(
      'keyup', this.upHandler.bind(info), false
    )

    return info
  }

  /**
   * The internal keyboard event handler for keydown.
   * @access private
   * @param {KeyboardEvent} event - The browser KeyboardEvent
   */
  KeyboardInput.prototype.downHandler = function (event) {
    if (event.key === this.key) {
      if (this.isUp && this.down) this.down(event)
      this.isDown = true
      this.isUp = false
    }
    event.preventDefault()
  }

  /**
   * The internal keyboard event handler for keyup.
   * @access private
   * @param {KeyboardEvent} event - The browser KeyboardEvent
   */
  KeyboardInput.prototype.upHandler = function (event) {
    if (event.key === this.key) {
      if (this.isDown && this.up) this.up(event)
      this.isDown = false
      this.isUp = true
    }
    event.preventDefault()
  }

  return KeyboardInput
})