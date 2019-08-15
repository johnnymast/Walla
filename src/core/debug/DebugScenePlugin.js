define(['core/ScenePlugin', 'core/debug/DebugDialog'], function (ScenePlugin, DebugDialog) {

  let DebugScenePlugin = function () {
    ScenePlugin.call(this)

    this.init()
  }

  extend(DebugScenePlugin, ScenePlugin)

  DebugScenePlugin.prototype.init = function () {
    this.dialog = new DebugDialog()
    this.SceneManager.currentScene.addChild(this.dialog);
    console.log('DebugScenePlugin: ', this.SceneManager.currentScene)
    this.SceneManager.registerPlugin('debug-dialog', this)
  }
  /**
   * Update the GamePad's and its sub-objects.
   *
   * @param {number} delta - Time passed since last update
   */
  DebugScenePlugin.prototype.update = function (delta) {

  }

  return DebugScenePlugin
})