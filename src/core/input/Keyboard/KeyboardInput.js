/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

/**
 * KeyboardInput handler.
 * @class KeyboardInput
 */
class KeyboardInput {

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
  constructor (keyCode) {

    let key = {}
    key.keyCode = keyCode
    key.isDown = false
    key.isUp = true
    key.down = undefined
    key.up = undefined

    this.key = key

    window.addEventListener(
      'keydown', this.downHandler.bind(this), false
    )

    window.addEventListener(
      'keyup', this.upHandler.bind(this), false
    )
  }

  reset () {
    this.key.isDown = false
    this.key.isUp = true
  }

  /**
   * Return the key object.
   *
   * @returns {object}
   */
  getKey () {
    return this.key
  }

  /**
   * Check to see if the key is down.
   *
   * @returns {boolean}
   */
  isDown () {
    return this.key.isDown
  }

  /**
   * Check to see if the key is up.
   *
   * @returns {boolean}
   */
  isUp () {
    return this.key.isUp
  }

  /**
   * The internal keyboard event handler for keydown.
   * @access private
   * @param {KeyboardEvent} event - The browser KeyboardEvent
   */
  downHandler (event) {
    if (event.key === this.key.keyCode) {
      this.key.isDown = true
      this.key.isUp = false

      if (this.key.down) {
        this.key.down(event)
      }
    }
    event.preventDefault()
  }

  /**
   * The internal keyboard event handler for keyup.
   * @access private
   * @param {KeyboardEvent} event - The browser KeyboardEvent
   */
  upHandler (event) {
    if (event.key === this.key.keyCode) {
      this.key.isDown = false
      this.key.isUp = true

      if (this.key.up) {
        this.key.up(event)
      }
    }
    event.preventDefault()
  }

  update (delta) {
    // Unused but required by the InputManager
  }
}

module.exports = KeyboardInput