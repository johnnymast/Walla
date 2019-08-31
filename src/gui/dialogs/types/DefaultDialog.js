const BaseDialog = require('gui/dialogs/BaseDialog')

class DefaultDialog extends BaseDialog {
  constructor (options) {
    super(options)

    this.create(options)
    this.init()
  }

  init () {
    // empty
  }
}

module.exports = DefaultDialog