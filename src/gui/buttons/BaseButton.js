const State = require('./const').BUTTON_STATE
const Type = require('./const').BUTTON_TYPE

const GameObject = require('core/GameObject')

class Button extends GameObject {
  constructor (options, ...items) {
    super(options)

    this.on('pointerdown', this._onPointerDown.bind(this))
    this.on('pointerup', this._onPointerUp.bind(this))
    this.on('pointerout', this._onPointerOut.bind(this))
    this.on('pointerover', this._onPointerOver.bind(this))
  }

  create (options) {
    this._options = options
    this.x = this._options.x
    this.y = this._options.y
  }

  /**
   * In your level you can overwrite this function
   * to get a callback from the button if it is being
   * restored to the default state.
   */
  onRestore () {
    // Overwrite this
  }

  /**
   * In your level you can overwrite this function
   * to get a callback from the button if it is being
   * clicked.
   */
  onClick () {
    // Overwrite this
  }

  /**
   * In your level you can overwrite this function
   * to get a button from the checkbox if it is being
   * hovered.
   */
  onHover () {
    // Overwrite this
  }

  /**
   * Determine if the button is activates.
   *
   * @returns {boolean}
   */
  isActive () {
    return (this.interactive === true && this.buttonMode === true)
  }

  /**
   * Activate the button
   */
  activate () {
    this.interactive = true
    this.buttonMode = true
  }

  /**
   * Deactivate the button
   */
  deactivate () {
    this.interactive = false
    this.buttonMode = true
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the button click is released.
   *
   * @param {event} event - The event object
   */
  _onPointerUp (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the button is clicked.
   *
   * @param {event} event - The event object
   */
  _onPointerDown (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the mouse cursor leaves the
   * button.
   *
   * @param {event} event - The event object
   */
  _onPointerOut (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the button is hovered.
   *
   * @param {event} event - The event object
   */
  _onPointerOver (event) {
    // Function body
  }
}

module.exports = Button