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
  var KeyboardInput = function (keyCode) {

    let key = {}
    key.code = keyCode
    key.isDown = false
    key.isUp = true
    key.press = undefined
    key.release = undefined

    window.addEventListener(
      'keydown', this.downHandler.bind(key), false
    )
    window.addEventListener(
      'keyup', this.upHandler.bind(key), false
    )

    return key
  }


  /**
   * The internal keyboard event handler for keydown.
   * @access private
   * @param {KeyboardEvent} event - The browser KeyboardEvent
   */
  KeyboardInput.prototype.downHandler = function(event) {

    if (event.keyCode === this.code) {
      if (this.isUp && this.press) this.press(event)
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
  KeyboardInput.prototype.upHandler = function(event) {
    if (event.keyCode === this.code) {
      if (this.isDown && this.release) this.release(event)
      this.isDown = false
      this.isUp = true
    }
    event.preventDefault()
  }

  return KeyboardInput
})