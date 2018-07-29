define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  let BaseSlider = function (options, ...items) {
    GameObject.call(this, options)

    this._options = options

    if (typeof this._options.width === 'undefined') {
      throw new Error('BaseSlider: width provided.')
    }

    if (typeof this._options.height === 'undefined') {
      throw new Error('BaseSlider: height provided.')
    }

    if (typeof this._options.x === 'undefined') {
      throw new Error('BaseSlider: x position provided.')
    }

    if (typeof this._options.y === 'undefined') {
      throw new Error('BaseSlider: y position provided.')
    }

    if (typeof this._options.min === 'undefined') {
      throw new Error('BaseSlider: minimum value is not provided.')
    }

    if (typeof this._options.max === 'undefined') {
      throw new Error('BaseSlider: maximum value is not provided.')
    }

    this.x = this._options.x
    this.y = this._options.y

    this.value = this._options.min
    this.isBeingDragged = false

    this.activate()

    this.on('pointerdown', this._onPointerDown.bind(this))
    this.on('pointerup', this._onPointerUp.bind(this))
    this.on('pointerout', this._onPointerOut.bind(this))
    this.on('pointerover', this._onPointerOver.bind(this))
    this.on('pointerover', this._onPointerOver.bind(this))
    this.on('mousemove', this._onMouseMove)
  }

  extend(BaseSlider, GameObject)

  /**
   * Return the slider value.
   *
   * @returns {number}
   */
  BaseSlider.prototype.getValue = function () {
    return this.value
  }

  /**
   * Set the value for the slider.
   *
   * @param {number} value - the value for the slider
   */
  BaseSlider.prototype.setValue = function (value) {
    this.value = value
    this.emit('slider.set_value', this.value)
  }

  /**
   * In your level you can overwrite this function
   * to get a callback from the slider if it is being
   * clicked.
   */
  BaseSlider.prototype.onClick = function () {
    // Overwrite this in your level
  }

  /**
   * In your level you can overwrite this function
   * to get a callback from the checkbox if it is being
   * hovered.
   */
  BaseSlider.prototype.onHover = function () {
    // Overwrite this in your level
  }

  /**
   * In your level you can overwrite this function
   * to get a callback from the slider if the mouse
   * is leaving the object.
   */
  BaseSlider.prototype.onLeave = function () {
    // Overwrite this in your level
  }

  /**
   * Activate the slider
   */
  BaseSlider.prototype.activate = function () {
    this.interactive = true
    this.buttonMode = true
  }

  /**
   * Deactivate the slider
   */
  BaseSlider.prototype.deactivate = function () {
    this.interactive = false
    this.buttonMode = true
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the slider click is released.
   *
   * @param {event} event - The event object
   */
  BaseSlider.prototype._onPointerUp = function (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the slider is clicked.
   *
   * @param {event} event - The event object
   */
  BaseSlider.prototype._onPointerDown = function (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the mouse cursor leaves the
   * slider.
   *
   * @param {event} event - The event object
   */
  BaseSlider.prototype._onPointerOut = function (event) {
    // Function body
  }

   /**
   * You can overwrite this function if you wish
   * to handle if the slider is hovered.
   *
   * @param {event} event - The event object
   */
  BaseSlider.prototype._onPointerOver = function (event) {
    // Function body
  }

  /**
   * You can overwrite this function if you wish
   * to handle if thumb of the slider is moved.
   *
   * @param {event} event - The event object
   */
  BaseSlider.prototype._onMouseMove = function (event) {
    // Function body
  }



  return BaseSlider
})
