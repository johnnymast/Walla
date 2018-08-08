define(['pixi', 'core/GameEngine'], function (PIXI, GameEngine) {
  /**
   * @classdesc GameObject
   * @exports  core/GameObject
   * @class
   */
  let GameObject = function (options) {
    PIXI.Container.call(this, options)

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
     * @type {PhysicsManager}
     */
    this.PhysicsManager = this.ge.get('PhysicsManager')

    /**
     * @type {InputManager}
     */
    this.InputManager = this.ge.get('InputManager')

    /**
     * @type {PIXI.interaction.InteractionManager}
     */
    this.InteractionManager = this.app.renderer.plugins.interaction
  }

  extend(GameObject, PIXI.Container)

  return GameObject
})
