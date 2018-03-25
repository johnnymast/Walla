define(['pixi', 'core/GameEngine'], function (pixi, GameEngine) {
  var GameObject = function (options) {
    pixi.Container.call(this)

    this.ge = GameEngine.get()
    this.app = this.ge.get('App')

    this.AssetManager = this.ge.get('AssetManager')
    this.SceneManager = this.ge.get('SceneManager')
    this.StateManager = this.ge.get('StateManager')
    this.PhysicsManager = this.ge.get('PhysicsManager')
 

    // components = components || []
  }

  extend(GameObject, pixi.Container)

  GameObject.prototype.update = function (delta) {
    /**
     * Implement this function to handle game logic in your Scene.
     */
  }


  return GameObject
})
