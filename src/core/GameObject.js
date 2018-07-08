define(['pixi', 'core/GameEngine'], function (pixi, GameEngine) {
  let GameObject = function (options) {
    pixi.Container.call(this, options)

    this.ge = GameEngine.get()
    this.app = this.ge.get('App')

    this.AssetManager = this.ge.get('AssetManager')
    this.SceneManager = this.ge.get('SceneManager')
    this.StateManager = this.ge.get('StateManager')
    this.PhysicsManager = this.ge.get('PhysicsManager')

    this.InteractionManager = this.app.renderer.plugins.interaction
  }

  extend(GameObject, pixi.Container)

  return GameObject
})
