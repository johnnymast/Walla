const DIALOG_TYPE = require('./const').DIALOG_TYPE
const STATE = require('./const').DIALOG_STATE

const GameObject = require('core/GameObject')
const PIXI = require('pixi')

class BaseDialog extends GameObject {
  constructor () {
    super()

    this.STATE_OPEN = 'open'
    this.STATE_CLOSED = 'closed'
  }

  create(options) {
    this._options = options

    if (typeof this._options.x === 'undefined') {
      throw new Error('BaseDialog: no x provided.')
    }

    if (typeof this._options.y === 'undefined') {
      throw new Error('BaseDialog: no y provided.')
    }

    if (typeof this._options.width === 'undefined') {
      throw new Error('BaseDialog: no width provided.')
    }

    if (typeof this._options.height === 'undefined') {
      throw new Error('BaseDialog: no height provided.')
    }

    if (typeof this.init === 'undefined') {
      throw new Error('BaseDialog: init() is not defined.')
    }

    this.on('internal.state.closing', this._closing)

    this.x = this._options.x
    this.y = this._options.y

    this.background = new PIXI.Container()
    this.background.width = this.width
    this.background.height = this.height
    this.background.name = 'background'
    this.addChild(this.background)

    this.content = new PIXI.Graphics()
    this.content.name = 'content'

    let content_outline_alpha = 0
    if (typeof this._options.outline_content !== 'undefined') {
      if (this._options.outline_content === true) {
        content_outline_alpha = 1
      }
    }

    this.content.lineStyle(2, 0xFF0000, content_outline_alpha)
    this.content.beginFill(0xFFFFFF, 0)
    this.content.drawRect(
      this._options.padding,
      this._options.padding,
      this._options.width - (this._options.padding * 2),
      this._options.height - (this._options.padding * 2),
    )

    this.addChild(this.content)
  }

  _closing () {
    this.onClose()
  }

  onOpen () {
    // overwrite
  }

  onClose () {
    console.log('BaseDialog.onClose')
    // overwrite
  }

  /**
   * Check if the Dialog is open or not.
   *
   * @returns {boolean} true if the Dialog is open
   */
  isOpen () {
    return (this.state === STATE.OPEN)
  }

  /**
   * Check if the Dialog is closed or not.
   *
   * @returns {boolean} true if the Dialog is closed
   */
  isClosed () {
    return (this.state === STATE.CLOSED)
  }

  /**
   *
   * @return {*}
   */
  getContent () {
    if (this.instance) {
      return this.instance.content
    }
    return null
  }

  /**
   *
   * @param {GameObject} content
   */
  addContent (content) {
    if (content) {
      this.content.addChild(content)
    }
  }
}

module.exports = BaseDialog
