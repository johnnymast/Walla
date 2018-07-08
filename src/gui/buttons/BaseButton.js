const State = require('./const').BUTTON_STATE
const Type = require('./const').BUTTON_TYPE

define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  let Button = function (options, ...items) {
    GameObject.call(this, options)

    this.options = {

    }

    this.options = merge(this.options, options)
    this.items = []

    this.on('pointerdown', this._onPointerDown.bind(this))
    this.on('pointerup', this._onPointerUp.bind(this))
    this.on('pointerout', this._onPointerOut.bind(this))
    this.on('pointerover', this._onPointerOver.bind(this))
  }

  extend(Button, GameObject)

  Button.prototype.onRestore = function() {
    // Overwrite this
  }

  Button.prototype.onClick = function() {
    // Overwrite this
  }

  Button.prototype.onHover = function() {
    // Overwrite this
  }


  /**
   * Activate the button
   */
  Button.prototype.activate = function () {
    this.interactive = true
    this.buttonMode = true
  }

  /**
   * Deactivate the button
   */
  Button.prototype.deactivate = function () {
    this.interactive = false
    this.buttonMode = true
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the button click is released.
   *
   * @param {event} event - The event object
   */
  Button.prototype._onPointerUp = function (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the button is clicked.
   *
   * @param {event} event - The event object
   */
  Button.prototype._onPointerDown = function (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the mouse cursor leaves the
   * button.
   *
   * @param {event} event - The event object
   */
  Button.prototype._onPointerOut = function (event) {
    // Function body
  }
  /**
   * You can overwrite this function if you wish
   * to handle if the button is hovered.
   *
   * @param {event} event - The event object
   */
  Button.prototype._onPointerOver = function (event) {
    // Function body
  }

  return Button
})
