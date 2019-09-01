const PIXI = require('pixi')
const GameEngine = require('core/GameEngine')

class GameObject extends PIXI.Container {
  /**
   * @classdesc GameObject
   * @exports  core/GameObject
   * @class
   */
  constructor (options) {
    super(options)

    /**
     * @type {GameEngine}
     */
    this.ge = GameEngine.get()

    /**
     * @type {PIXI.Application}
     */
    this.app = this.ge.get('App')

    /**
     * @type {AssetManager}
     */
    this.AssetManager = this.ge.get('AssetManager')

    /**
     * @type {SceneManager}
     */
    this.SceneManager = this.ge.get('SceneManager')

    /**
     * @type {StateManager}
     */
    this.StateManager = this.ge.get('StateManager')

    /**
     * @type {InputManager}
     */
    this.InputManager = this.ge.get('InputManager')

    /**
     * @type {ResizeManager}
     */
    this.ResizeManager = this.ge.get('ResizeManager')

    /**
     * @type PluginManager
     */
    this.PluginManager = this.ge.get('PluginManager')

    /**
     * @type {PIXI.interaction.InteractionManager}
     */
    this.InteractionManager = this.app.renderer.plugins.interaction
  }
}

module.exports = GameObject