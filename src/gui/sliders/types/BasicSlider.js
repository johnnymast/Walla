const BaseSlider = require('../BaseSlider')

define(['pixi', 'core/GameObject'], function (PIXI, GameObject) {

  let BasicSlider = function (options) {

    this.options = {
      trackThickness: 2,
      trackColor: 0x6d4b27,
      trackOpacity: 1,
      thumbBorderThickness: 2,
      thumbBorderColor: 0xff0000,
      thumbBorderOpacity: 1,
      thumbFillColor: 0x6d4b27,
      thumbOpacity: 1,
      thumbWidth: 25,
      thumbHeight: 25,
      clickable: true, // false default
      min: 0,
      max: 1,
    }

    this.options = extend2(true, this.options, options)

    BaseSlider.call(this, this.options)

    this.on('slider.set_value', this._setValue.bind(this))

    this.init()
  }

  extend(BasicSlider, BaseSlider)

  /**
   * Initialize the BasicSlider.
   */
  BasicSlider.prototype.init = function () {

    let options = this.options
    let track = new PIXI.Graphics()
    let thumb = new PIXI.Graphics()

    /**
     * Create the track
     */
    track.lineStyle(options.trackThickness, options.trackColor, options.trackOpacity)
    track.moveTo(0, 0)
    track.lineTo(this.options.width, 0)
    track.endFill()

    /**
     * Creat the numb
     */
    track.lineStyle(options.thumbBorderThickness, options.thumbBorderColor, options.thumbBorderOpacity)

    if (this.options.clickable == true) {
      track.hitArea = track.getBounds();
      track.interactive = true
      track.on('pointerdown', this._trackClicked.bind(this))
    }

    thumb.beginFill(options.thumbFillColor, options.thumbOpacity)
    thumb.drawRect(0, -options.thumbHeight / 2, options.thumbWidth, options.thumbHeight)
    thumb.endFill()

    this.thumb = thumb

    this.addChild(track)
    this.addChild(thumb)
  }

  BasicSlider.prototype._setValue = function(value) {
    if (value > this.options.max)
      throw new Error(`BasicSlider: ${value} is higher the the configured maximum of ${this.options.max}`)
    else if (value < this.options.min)
      throw new Error(`BasicSlider: ${value} is lower the the configured minimum of ${this.options.min}`)

    let x = value.map(this.options.min, this.options.max, 0, this.options.width)
    this._moveThumbTo(x)
  }

  BasicSlider.prototype._moveThumbTo = function(x) {
    let newx = x - this.options.thumbWidth

    if (newx > (this.options.width - this.options.thumbWidth)) {
      newx = (this.options.width - this.options.thumbWidth)
    }

    if (newx < 0) {
      newx = 0
    }
    this.thumb.position.x = newx

    let value = (newx / (this.options.width - this.options.thumbWidth)) * 100
    this.value = value.map(0, 100, this.options.min, this.options.max)

    console.log('FIXME: On mouse out move bug')
    console.log('FIXME: SetValue bug under 10')
    console.log('FIXME: Emit back that value changed')
    console.log('TODO: Documentation')

    console.log(this.value)
  }


  /**
   *
   * @param {event} event - The event object
   * @private
   */
  BasicSlider.prototype._trackClicked = function(event) {
    let coords = event.data.global
    this._moveThumbTo(coords.x)
  }


  /**
   * Handle on mouse click functionality for the BasicSlider.
   *
   * @param {event} event - The event object
   */
  BasicSlider.prototype._onPointerDown = function (event) {
    this.isBeingDragged = true
    this.onClick()
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the slider click is released.
   *
   * @param {event} event - The event object
   */
  BasicSlider.prototype._onPointerUp = function (event) {
    this.isBeingDragged = false
  }

  /**
   * You can overwrite this function if you wish
   * to handle if thumb of the slider is moved.
   *
   * @param {event} event - The event object
   */
  BasicSlider.prototype._onMouseMove = function (event) {
    if (this.isBeingDragged === true) {
      let coords = event.data.global
      this._moveThumbTo(coords.x, coords.y)
    }
  }

  /**
   * Handle on mouse over functionality for the BasicSlider.
   *
   * @param {event} event - The event object
   */
  BasicSlider.prototype._onPointerOver = function (event) {
    this.onHover()
  }

  /**
   * Handle on mouse out functionality for the BasicSlider.
   *
   * @param {event} event - The event object
   * @private
   */
  BasicSlider.prototype._onPointerOut = function (event) {
    this.onLeave()
  }

  return BasicSlider
})