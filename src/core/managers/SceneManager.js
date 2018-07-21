/**
 * SceneManager
 * @namespace Core Managers
 */
define(['core/GameEngine'], function (GameEngine) {

  /**
   * @classdesc SceneManager
   * @exports  core/managers/SceneManager
   * @class
   */
  let SceneManager = function (scene = '') {
    this.scenes = []
    this.currentScene = null
    this.app = GameEngine.get().get('App')

    if (scene.length > 0) {
      this.add(scene)
      this.switchTo(scene)
    }
  }

  /**
   * Add an existing scene to the internal cache.
   *
   * @param {string} scene - The name of the scene
   * @param {string} options - Options given to GameObject down the line
   * @returns {SceneManager}
   */
  SceneManager.prototype.add = function (scene, options) {
    if (!this.scenes[scene]) {
      let _scene = require('screens/' + scene)
      this.scenes[scene] = new _scene(options)
    }
    return this
  }

  /**
   * Return a scene by name.
   *
   * @param {string} scene - The name of the screen to get
   * @returns {*}
   */
  SceneManager.prototype.getScene = function (scene) {
    return this.scenes[scene]
  }

  /**
   * Switch to a given next scene.
   *
   * @param {string|Scene} scene - The scene to switch to
   */
  SceneManager.prototype.switchTo = function (scene) {

    if (!this.getScene(scene)) {
      if (typeof scene === 'string') {
        this.add(scene)
      }
    }

    let nextScene = this.getScene(scene)

    if (nextScene) {
      if (this.currentScene) {
        this.app.stage.removeChild(this.currentScene)
      }

      nextScene.start()

      this.currentScene = nextScene
      this.app.stage.addChild(this.currentScene)
    }
  }

  return SceneManager
})
