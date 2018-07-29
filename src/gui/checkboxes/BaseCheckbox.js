const Type = require('./const').CHECKBOX_TYPE
const State = require('./const').CHECKBOX_STATE

define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  let BaseCheckbox = function (options, ...items) {
    GameObject.call(this, options)

    this._options = options

    if (typeof this._options.state === 'undefined' || (this._options.state === State.CHECKED
      || this._options.state === State.UNCHECKED) === false) {
      throw new Error('BaseCheckbox: No initial state has been provided.')
    }

    if (typeof this._options.width === 'undefined') {
      throw new Error('BaseCheckbox: width provided.')
    }

    if (typeof this._options.height === 'undefined') {
      throw new Error('BaseCheckbox: height provided.')
    }

    if (typeof this._options.x === 'undefined') {
      throw new Error('BaseCheckbox: x position provided.')
    }

    if (typeof this._options.y === 'undefined') {
      throw new Error('BaseCheckbox: y position provided.')
    }

    this.x = this._options.x
    this.y = this._options.y

    this.state = this._options.state

    this.activate()

    this.on('pointerdown', this._onPointerDown.bind(this))
    this.on('pointerup', this._onPointerUp.bind(this))
    this.on('pointerout', this._onPointerOut.bind(this))
    this.on('pointerover', this._onPointerOver.bind(this))
  }

  extend(BaseCheckbox, GameObject)

  /**
   * Return the state of the checkbox.
   *
   * @returns {string}
   */
  BaseCheckbox.prototype.getState = function () {
    return this.state
  }

  /**
   * Set the state for the checkbox.
   *
   * @param {string} state - the new state for the checkbox
   */
  BaseCheckbox.prototype.setState = function (state = '') {
    this.state = state
    this.emit('checkbox.set_state', this.state)
  }

  /**
   * Call directly to check the checkbox.
   */
  BaseCheckbox.prototype.check = function () {
    this.setState(State.CHECKED)
  }

  /**
   * Call directly to check the checkbox.
   */
  BaseCheckbox.prototype.uncheck = function () {
    this.setState(State.UNCHECKED)
  }

  /**
   * Toggle the state to its inverted state.
   */
  BaseCheckbox.prototype.toggle = function () {
    this.setState((this.state == State.CHECKED) ? State.UNCHECKED : State.CHECKED)
  }

  /**
   * In your level you can overwrite this function
   * to get a callback from the checkbox if it is being
   * clicked.
   */
  BaseCheckbox.prototype.onClick = function () {
    // Overwrite this in your level
  }

  /**
   * In your level you can overwrite this function
   * to get a callback from the checkbox if it is being
   * hovered.
   */
  BaseCheckbox.prototype.onHover = function () {
    // Overwrite this in your level
  }

  /**
   * In your level you can overwrite this function
   * to get a callback from the checkbox if the mouse
   * is leaving the object.
   */
  BaseCheckbox.prototype.onLeave = function () {
    // Overwrite this in your level
  }

  /**
   * Activate the checkbox
   */
  BaseCheckbox.prototype.activate = function () {
    this.interactive = true
    this.buttonMode = true
  }

  /**
   * Deactivate the checkbox
   */
  BaseCheckbox.prototype.deactivate = function () {
    this.interactive = false
    this.buttonMode = true
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the checkbox click is released.
   *
   * @param {event} event - The event object
   */
  BaseCheckbox.prototype._onPointerUp = function (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the checkbox is clicked.
   *
   * @param {event} event - The event object
   */
  BaseCheckbox.prototype._onPointerDown = function (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the mouse cursor leaves the
   * checkbox.
   *
   * @param {event} event - The event object
   */
  BaseCheckbox.prototype._onPointerOut = function (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the checkbox is hovered.
   *
   * @param {event} event - The event object
   */
  BaseCheckbox.prototype._onPointerOver = function (event) {
    // Function body
  }

  return BaseCheckbox
})
