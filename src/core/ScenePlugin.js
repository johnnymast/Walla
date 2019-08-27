define(['core/GameObject'], function (GameObject) {

  let ScenePlugin = function (ke) {
    GameObject.call(this)
    this.setPreUpdateMode()
    this.setPostStartMode()
  }

  extend(ScenePlugin, GameObject)

  /**
   * Set update before the main scene.
   */
  ScenePlugin.prototype.setPreUpdateMode = function () {
    this.preupdate = true
    this.postupdate = false
  }

  /**
   * Set update before starting the main scene.
   */
  ScenePlugin.prototype.setPreStartMode = function () {
    this.prestart = true
    this.poststart = false
  }

  /**
   * Set update after the main scene.
   */
  ScenePlugin.prototype.setPostUpdateMode = function () {
    this.postupdate = true
    this.preupdate = false
  }

  /**
   * Set update after starting the main scene.
   */
  ScenePlugin.prototype.setPostStartMode = function () {
    this.poststart = true
    this.prestart = false
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene.
   *
   * @returns {boolean}
   */
  ScenePlugin.prototype.runsPreUpdate = function () {
    return (this.preupdate === true)
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene starting.
   *
   * @returns {boolean}
   */
  ScenePlugin.prototype.runsPreStart = function () {
    return (this.prestart === true)
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene.
   *
   * @returns {boolean}
   */
  ScenePlugin.prototype.runsPostUpdate = function () {
    return (this.postupdate === true)
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene starting.
   *
   * @returns {boolean}
   */
  ScenePlugin.prototype.runsPostStart = function () {
    return (this.poststart === true)
  }

  ScenePlugin.prototype.start = function () {
    // Overwrite
  }

  ScenePlugin.prototype.update = function (delta) {
    // Overwrite
  }

  return ScenePlugin
})