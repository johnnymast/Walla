define(['pixi', 'plugins/matterjs'], function (PIXI, Matter) {

  /**
   * The Pad object constructor.
   * @param {string} texture - the texture name.
   * @constructor
   */
  let PhysicsSprite = function (texture) {
    // this.PhysicsManager = new Matter.PhysicsManager()
    this.PhysicsManager = Matter.PhysicsManager.get()
    Matter.PhysicsSprite.call(this, texture)
  }

  extend(PhysicsSprite, Matter.PhysicsSprite)

  return PhysicsSprite
})