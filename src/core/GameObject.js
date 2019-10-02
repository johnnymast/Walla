/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const PIXI = require('pixi')
const GameEngine = require('core/GameEngine')

/**
 * GameObject class.
 * @extends PIXI.Container
 * @class Prophecy.GameObject
 */
class GameObject extends PIXI.Container {
  /**
   * GameObject constructor.
   * @param {object} options - The options for the PIXI.Container.
   */
  constructor (options) {
    super(options)

    /**
     * @type {GameEngine}
     */
    this.ge = GameEngine.get()

    /**
     * @type {Prophecy.Game}
     */
    this.game = this.ge.get('Game')

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
     * @deprecated
     */
    this.InteractionManager = this.app.renderer.plugins.interaction
  }
}

module.exports = GameObject