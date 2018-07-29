const BaseCheckbox = require('../BaseCheckbox')
const State = require('../const').CHECKBOX_STATE

define(['pixi', 'core/GameObject'], function (PIXI, GameObject) {

  let BasicCheckbox = function (options) {

    /**
     * BasicCheckbox default options.
     *
     * @type {{borderSize: number, borderColor: number, borderOpacity: number, fillColor: number, fillOpacity: number, markFillColor: number, markOpacity: number, padding: number, state: string}}
     */
    this.options = {
      borderSize: 1,
      borderColor: 0x6d4b27,
      borderOpacity: 1,
      fillColor: 0xa3703a,
      fillOpacity: 1,
      markFillColor: 0x6d4b27,
      markOpacity: 1,
      padding: 5,
      state: State.UNCHECKED,
    }

    this.options = extend2(true, this.options, options)

    BaseCheckbox.call(this, this.options)

    this.on('checkbox.set_state', this._setState)
    this.init()
  }

  extend(BasicCheckbox, BaseCheckbox)

  /**
   * Initialize the BasicCheckbox.
   */
  BasicCheckbox.prototype.init = function () {

    let options = this.options
    let wall = new PIXI.Graphics()
    let mark = new PIXI.Graphics()

    wall.lineStyle(options.borderSize, options.borderColor, options.borderOpacity)
    wall.beginFill(options.fillColor, options.fillOpacity)

    wall.drawRect(0, 0, options.width, options.height)
    wall.endFill()

    mark.beginFill(options.markFillColor, options.markOpacity)
    mark.drawRect(options.padding, options.padding,
      options.width - (options.padding * 2),
      options.height - (options.padding * 2))
    mark.endFill()

    this.mark = mark

    this.addChild(wall)
    this.addChild(mark)
    this._setState(this.state)
  }

  /**
   * Handle on mouse click functionality for the checkbox.
   *
   * @param {event} event - The event object
   */
  BasicCheckbox.prototype._onPointerDown = function (event) {
    this.toggle()
    this.onClick()
  }

  /**
   * Handle on mouse over functionality for the checkbox.
   *
   * @param {event} event - The event object
   */
  BasicCheckbox.prototype._onPointerOver = function (event) {
    this.onHover();
  }

  /**
   * Handle on mouse out functionality for the checkbox.
   *
   * @param {event} event - The event object
   * @private
   */
  BasicCheckbox.prototype._onPointerOut = function (event) {
    this.onLeave()
  }

  /**
   * Set the state for the BasicCheckBox.
   *
   * @param {string} state - the new state for the checkbox
   * @private
   */
  BasicCheckbox.prototype._setState = function (state) {
    if (state === State.CHECKED) {
      this.mark.visible = true
    } else {
      this.mark.visible = false
    }
  }

  return BasicCheckbox
})