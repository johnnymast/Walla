/**
 * SceneManager
 * @namespace Core Managers
 */
define(['core/GameEngine', 'core/transitions/types/TransactionType'], function (GameEngine, TransactionType) {

  /**
   * @classdesc SceneManager
   * @exports  core/managers/SceneManager
   * @class
   */
  let SceneManager = function (scene = '') {
    this.scenes = []
    this.plugins = []
    this.currentScene = null
    this.gameEngine = GameEngine.get()
    this.app = this.gameEngine.get('App')

    if (scene.length > 0) {
      this.add(scene)
      this.switchTo(scene)
    }
  }

  /**
   * Return all scene plugins as an array.
   *
   * @returns {Array}
   * @private
   */
  SceneManager.prototype._listScenePlugins = function () {
    return this.getPlugins()
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
   * Return an array of registered plugins.
   *
   * @returns {Array}
   */
  SceneManager.prototype.getPlugins = function () {
    return this.plugins
  }

  /**
   * Register a plugin for the scene.
   *
   * @param {string} key - The key to identify the plugin.
   * @param {object} instance - The plugin instance.
   */
  SceneManager.prototype.registerPlugin = function (key = '', instance = null) {
    this.plugins[key] = instance
  }

  /**
   * Remove a registered plugin.
   *
   * @param {string} key - The key to identify the plugin.
   */
  SceneManager.prototype.removePlugin = function (key = '') {
    if (typeof this.plugins[key] !== 'undefined') {
      delete this.plugins[key]
    }
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
        this.currentScene.switchedAway()
      }

      this.currentScene = nextScene
      nextScene.init()
      nextScene.start()

      this.app.stage.addChild(this.currentScene)
    }

    return nextScene
  }

  /**
   * Transition to a different scene.
   *
   * @param {string} scene - The name of the scene
   * @param {Transition} transition - The transition to execute.
   */
  SceneManager.prototype.switchToUsingTransaction = function (scene, transition) {
    let nextScene = null

    if (typeof this.scenes[scene] !== 'undefined') {
      nextScene = this.getScene(scene)
    } else {
      nextScene = this.add(scene).getScene(scene)
    }

    if (!nextScene) {
      throw new Error('switchToUsingTransaction: Error finding scene to switch to.')
    }

    if (!transition instanceof TransactionType) {
      throw new Error('switchToUsingTransaction: Unknown transition')
    }

    if (nextScene) {

      transition.on('animation_complete', (event) => {

        this.app.stage.removeChild(event.getFrom())
        event.getFrom().switchedAway()

        this.currentScene = nextScene
        this.currentScene.start()
      })

      nextScene.init()

      transition
        .setFrom(this.currentScene)
        .setTo(nextScene)
        .animate()
    }
  }

  return SceneManager
})
