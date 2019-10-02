/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const GameObject = require('core/GameObject')
const PIXI = require('pixi')

/**
 * Scene class.
 * @extends GameObject
 * @class Prophecy.Scene
 */
class Scene extends GameObject {

  /**
   * Scene constructor.
   * @param {object} options - Options to be passed to GameObject.
   * @constructor
   */
  constructor (name, options) {
    super(options)

    /**
     * The name of the scene.
     * @type {String}
     */
    this.name = name

    this.input = new Prophecy.InputManager()

    /**
     * Indicate if the scene is started.
     * @type {boolean}
     */
    this.started = false

    /**
     * Start the gameloop.
     */
    this.app.gameloop.add((delta) => {
      this._update(delta)
    })
  }

  /**
   * If you wish to load plugins or you have any prepossessing
   * todo before starting your scene you can overwrite this function.
   */
  init () {
    /**
     * This function will be called during the loading of Scenes.
     * You can implement this method to act on this event.
     */
  }

  /**
   * If you wish to preload assets in your scene you can
   * overwrite this function.
   *
   * preload () {
   *  // This function will be called during the loading of Scenes.
   *  // You can implement this method to act on this event.
   * }
   */

  /**
   * If you wish to initialize game objects you can overwrite this
   * function.
   */
  create () {
    /**
     * This function will be called during the loading of Scenes.
     * You can implement this method to act on this event.
     */
  }

  /**
   * Callback for the onResume event. You can overwrite this your self
   * to receive the onResume call.
   */
  start () {
    /**
     * This function will be called when the scene is unpauzed. You can overwrite this in
     * your Scene to act on this event.
     */
  }

  /**
   * Callback for the pause event. You can overwrite this your self
   * to receive the onPause call.
   */
  stop () {
    /**
     * This function will be called when the Scene is paused.You can overwrite this in
     * your Scene to act on this event.
     */
  }

  /**
   * If you want to keep track of your game switching away from
   * your current scene, implement this function in the scene that
   * will be left.
   *
   * @param {Scene} scene
   */
  movedToScene (scene) {
    /**
     * This function will be called while switching from the
     * old to the new scene.
     */
  }

  /**
   * If you want to keep track of your game switching from scene to
   * scene, implement this function your.
   *
   * @param {Scene} scene
   */
  movedFromScene (scene) {
    /**
     * This function will be called while switching to the
     * the new scene.
     */
  }

  /**
   * Overwrite an implement this function in your scene
   * to update your game
   * @param delta
   */
  update (delta) {
    /**
     * This function will be called each time the scene will
     * be updated.
     */
  }

  /**
   * Start the scene
   */
  boot () {

    let plugins = this.SceneManager.getPlugins()

    for (let key in plugins) {
      if (plugins[key].runsPreStart()) {
        plugins[key].start()
      }
    }

    this.start()
    this.started = true

    for (let key in plugins) {
      if (plugins[key].runsPostStart()) {
        plugins[key].start()
      }
    }
  }

  /**
   * Pause the scene
   */
  stop () {
    this.app.gameloop.pause()
    this.started = false
  }

  /**
   * Resume a paused scene.
   */
  resume () {
    this.app.gameloop.start()
    this.started = true
  }

  /**
   * Internal update function. This is called per tick.
   *
   * @param {number} delta - the delta time since the last update
   * @private
   */
  _update (delta) {

    if (this.started) {
      let plugins = this.SceneManager.getPlugins()

      for (let key in plugins) {
        if (plugins[key].runsPreUpdate()) {
          plugins[key].update(delta)
        }
      }

      this.game.world.update(delta)
      this.update(delta)

      for (let key in plugins) {
        if (plugins[key].runsPostUpdate()) {
          plugins[key].update(delta)
        }
      }
    }
  }
}

module.exports = Scene