const GameObject = require('core/GameObject')

class ScenePlugin extends GameObject {
  constructor () {
    super()

    this.setPreUpdateMode()
    this.setPostStartMode()
  }

  /**
   * Set update before the main scene.
   */
  setPreUpdateMode () {
    this.preupdate = true
    this.postupdate = false
  }

  /**
   * Set update before starting the main scene.
   */
  setPreStartMode () {
    this.prestart = true
    this.poststart = false
  }

  /**
   * Set update after the main scene.
   */
  setPostUpdateMode () {
    this.postupdate = true
    this.preupdate = false
  }

  /**
   * Set update after starting the main scene.
   */
  setPostStartMode () {
    this.poststart = true
    this.prestart = false
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene.
   *
   * @returns {boolean}
   */
  runsPreUpdate () {
    return (this.preupdate === true)
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene starting.
   *
   * @returns {boolean}
   */
  runsPreStart () {
    return (this.prestart === true)
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene.
   *
   * @returns {boolean}
   */
  runsPostUpdate () {
    return (this.postupdate === true)
  }

  /**
   * Ask if the plugin updates before (pre) or after (post) the
   * main scene starting.
   *
   * @returns {boolean}
   */
  runsPostStart () {
    return (this.poststart === true)
  }

  /**
   * Placeholder overwrite for the start
   * function of a plugin.
   */
  start () {
    // Overwrite
  }

  /**
   * Placeholder overwrite for the update
   * function of a plugin.
   *
   * @param {number} delta - Number of ticks since last update
   */
  update (delta) {
    // Overwrite
  }
}

module.exports = ScenePlugin
