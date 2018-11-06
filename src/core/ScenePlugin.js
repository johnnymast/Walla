define(['core/GameObject'], function (GameObject) {

  let ScenePlugin = function (ke) {
    GameObject.call(this)
    this.setPreMode()
  }

  extend(ScenePlugin, GameObject)

  /**
   * Set update before the main scene.
   */
  ScenePlugin.prototype.setPreMode = function () {
    this.pre = true
    this.post = false
  }

  /**
   * Set update after the main scene.
   */
  ScenePlugin.prototype.setPostMode = function () {
    this.post = true
    this.pre = false
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene.
   *
   * @returns {boolean}
   */
  ScenePlugin.prototype.runsPre = function () {
    return (this.pre === true)
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene.
   *
   * @returns {boolean}
   */
  ScenePlugin.prototype.runsPost = function () {
    return (this.post === true)
  }

  return ScenePlugin
})