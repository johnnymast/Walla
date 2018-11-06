/**
 * KeyboardInput
 * @namespace Interaction
 */
define([], function () {

  /**
   * Take control over Keyboard input by using this class.
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

    this.info = info

    window.addEventListener(
      'keydown', this.downHandler.bind(this), false
    )

    window.addEventListener(
      'keyup', this.upHandler.bind(this), false
    )
  }

  /**
   * Return the information object.
   *
   * @returns {object}
   */
  KeyboardInput.prototype.getInfo = function () {
    return this.info
  }

  /**
   * Check to see if the key is down.
   *
   * @returns {boolean}
   */
  KeyboardInput.prototype.isDown = function () {
    return this.info.isDown
  }

  /**
   * Check to see if the key is up.
   *
   * @returns {boolean}
   */
  KeyboardInput.prototype.isUp = function () {
    return this.info.isUp
  }

  /**
   * The internal keyboard event handler for keydown.
   * @access private
   * @param {KeyboardEvent} event - The browser KeyboardEvent
   */
  KeyboardInput.prototype.downHandler = function (event) {
    if (event.key === this.info.key) {
      this.info.isDown = true
      this.info.isUp = false

      if (this.info.down) {
        this.info.down(event)
      }
    }
    event.preventDefault()
  }

  /**
   * The internal keyboard event handler for keyup.
   * @access private
   * @param {KeyboardEvent} event - The browser KeyboardEvent
   */
  KeyboardInput.prototype.upHandler = function (event) {
    if (event.key === this.info.key) {
      this.info.isDown = false
      this.info.isUp = true

      if (this.info.up) {
        this.info.up(event)
      }
    }
    event.preventDefault()
  }

  KeyboardInput.prototype.update = function (delta) {
    // Unused but required by the InputManager
  }

  return KeyboardInput
})