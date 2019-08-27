const ScenePlugin = require('core/ScenePlugin')
const DebugDialog = require('../dialog/DebugDialog')

class Plugin extends ScenePlugin {
  constructor () {
    super()
    this.setPostUpdateMode()
    this.runsPostStart()
    this.init()
  }

  /**
   * Initialize the object
   */
  init () {
    this.dialog = DebugDialog.getInstance();
    this.SceneManager.registerPlugin('debug-dialog', this)
  }

  /**
   * Start callback
   */
  start () {
    if (this.dialog.parent) {
      this.dialog.parent.removeChild(this.dialog)
    }
    this.app.stage.addChild(this.dialog)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Plugin
}