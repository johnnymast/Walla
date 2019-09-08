const Scene = require('core/Scene')
const GameEngine = require('core/GameEngine')
const TransactionType = require('core/transitions/types/TransactionType')
class SceneManager {
  constructor (scene = '') {
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
  _listScenePlugins () {
    return this.getPlugins()
  }

  /**
   * Add an existing scene to the internal cache.
   *
   * @param {string} scene - The name of the scene
   * @param {string} options - Options given to GameObject down the line
   * @returns {SceneManager}
   */
  add (scene, options) {
    if (!this.scenes[scene]) {
      let _scene = require('screens/' + scene)
      this.scenes[scene] = new _scene(options)
    }
    return this
  }

  /**
   * Add a new Scene to the stack.
   *
   * @param {string} name - The name of the scene
   * @param {Scene} scene - The actual scene object
   */
  addSceneInstance (name, scene) {
    this.scenes[name] = scene
    return this
  }

  /**
   * Return a scene by name.
   *
   * @param {string} scene - The name of the screen to get
   * @returns {*}
   */
  getScene (scene) {
    return this.scenes[scene]
  }

  /**
   * Return an array of registered plugins.
   *
   * @returns {Array}
   */
  getPlugins () {
    return this.plugins
  }

  /**
   * Register a plugin for the scene.
   *
   * @param {string} key - The key to identify the plugin.
   * @param {object} instance - The plugin instance.
   */
  registerPlugin (key = '', instance = null) {
    this.plugins[key] = instance
  }

  /**
   * Remove a registered plugin.
   *
   * @param {string} key - The key to identify the plugin.
   */
  removePlugin (key = '') {
    if (typeof this.plugins[key] !== 'undefined') {
      delete this.plugins[key]
    }
  }

  /**
   * Switch to a given next scene.
   *
   * @param {string|Scene} scene - The scene to switch to
   */
  switchTo (scene) {

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
  switchToUsingTransaction (scene, transition) {
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

}

module.exports = SceneManager