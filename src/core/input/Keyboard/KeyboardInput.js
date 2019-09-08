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
  constructor (key) {

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
  getInfo () {
    return this.info
  }

  /**
   * Check to see if the key is down.
   *
   * @returns {boolean}
   */
  isDown () {
    return this.info.isDown
  }

  /**
   * Check to see if the key is up.
   *
   * @returns {boolean}
   */
  isUp () {
    return this.info.isUp
  }

  /**
   * The internal keyboard event handler for keydown.
   * @access private
   * @param {KeyboardEvent} event - The browser KeyboardEvent
   */
  downHandler (event) {
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
  upHandler (event) {
    if (event.key === this.info.key) {
      this.info.isDown = false
      this.info.isUp = true

      if (this.info.up) {
        this.info.up(event)
      }
    }
    event.preventDefault()
  }

  update (delta) {
    // Unused but required by the InputManager
  }
}

module.exports = KeyboardInput