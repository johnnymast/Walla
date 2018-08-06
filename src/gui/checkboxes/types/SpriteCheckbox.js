const BaseCheckbox = require('../BaseCheckbox')
const State = require('../const').CHECKBOX_STATE

define(['pixi', 'core/GameObject'], function (PIXI, GameObject) {

  let SpriteCheckbox = function (options) {

    this.options = {
      state: State.UNCHECKED,
      sprite_checked: null,
      sprite_unchecked: null,
    }

    this.options = merge(this.options, options)
    BaseCheckbox.call(this, this.options)

    if (typeof this.options.sprite_checked === 'undefined') {
      throw new Error('BaseCheckbox: sprite_checked not provided.')
    }

    if (typeof this.options.sprite_unchecked === 'undefined') {
      throw new Error('BaseCheckbox: sprite_unchecked not provided.')
    }

    this.on('checkbox.set_state', this._setState)
    this.init()
  }

  extend(SpriteCheckbox, BaseCheckbox)

  /**
   * Initialize the components that make this checkbox.
   */
  SpriteCheckbox.prototype.init = function () {

    let options = this.options
    this.checked = options.sprite_checked
    this.unchecked = options.sprite_unchecked

    this.addChild(this.checked)
    this.addChild(this.unchecked)
    this._setState(this.state)
  }

  /**
   * @param {event} event - The event object
   */
  SpriteCheckbox.prototype._onPointerDown = function (event) {
    this.toggle()
    this.onClick()
  }

  /**
   * Handle on mouse over functionality for the checkbox.
   *
   * @param {event} event - The event object
   */
  SpriteCheckbox.prototype._onPointerOver = function (event) {
    this.onHover()
  }

  /**
   * Handle on mouse out functionality for the checkbox.
   *
   * @param {event} event - The event object
   * @private
   */
  SpriteCheckbox.prototype._onPointerOut = function (event) {
    this.onLeave()
  }

  /**
   * Set the state for the SpriteCheckbox.
   *
   * @param {string} state - the new state for the checkbox
   * @private
   */
  SpriteCheckbox.prototype._setState = function (state) {
    if (state === State.CHECKED) {
      this.unchecked.visible = false
      this.checked.visible = true
    } else {
      this.checked.visible = false
      this.unchecked.visible = true
    }
  }

  return SpriteCheckbox
})