const DIALOG_TYPE = require('./const').DIALOG_TYPE
const STATE = require('./const').DIALOG_STATE

const DefaultDialog = require('gui/dialogs/types/DefaultDialog')
const CloseableDialog = require('gui/dialogs/types/CloseableDialog')

define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  let Dialog = function (options, ...items) {
    GameObject.call(this, options)

    this.STATE_OPEN = 'open'
    this.STATE_CLOSED = 'closed'

    console.log('DIALOG_TYPE', DIALOG_TYPE)
    this.options = {
      type: DIALOG_TYPE.DEFAULT,
      state: STATE.CLOSED
    }

    this.options = merge(this.options, options)
    this.items = []

    this.state = this.options.state
    this.instance = null

    this.init()
  }

  extend(Dialog, GameObject)

  /**
   *
   * @param {GameObject} content
   */
  Dialog.prototype.addContent = function(content) {
    if (content && this.instance) {
      this.instance.addContent(content)
    }
  }


  Dialog.prototype.getContent = function () {
    if (this.instance) {
      return this.instance.content
    }
    return null
  }

  Dialog.prototype.init = function () {
    switch (this.options.type) {
      case DIALOG_TYPE.DEFAULT:
        this.instance = new DefaultDialog(this.options)
        break
      case DIALOG_TYPE.CLOSEABLE:
        this.instance = new CloseableDialog(this.options)
        break
      default:
        throw new Error(`Dialog type unknown: Unable to reconize ${this.options.type}`)
    }

    this.on('internal.state.closing', this._closing)

    if (this.instance) {

      this.addChild(this.instance)
    }
  }

  Dialog.prototype._closing = function() {
    this.onClose()
  }

  Dialog.prototype.onOpen = function () {
    // overwrite
  }

  Dialog.prototype.onClose = function () {
    // overwrite
  }

  /**
   * Check if the Dialog is open or not.
   *
   * @returns {boolean} true if the Dialog is open
   */
  Dialog.prototype.isOpen = function () {
    return (this.state === STATE.OPEN)
  }

  /**
   * Check if the Dialog is closed or not.
   *
   * @returns {boolean} true if the Dialog is closed
   */
  Dialog.prototype.isClosed = function () {
    return (this.state === STATE.CLOSED)
  }

  Dialog.prototype.update = function (delta) {
    for (let item of this.items) {
      item.update(delta)
    }
  }

  return Dialog
})
