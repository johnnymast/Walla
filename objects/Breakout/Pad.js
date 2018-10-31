define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {

  /**
   * The Pad object constructor.
   * @param {string} texture - the texture name.
   * @constructor
   */
  let Pad = function (texture) {
    PhysicsSprite.call(this, texture)
  }

  extend(Pad, PhysicsSprite)

  /**
   * Setup the physics object. This is part of the PhysicsSprite.
   */
  Pad.prototype.setupBody = function () {
    let options = {
      isStatic: true
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name
    this.PhysicsManager.add(this.body)
  }

  /**
   * Update the Pad object.
   * @param {number} delta - the number of ticks since last update.
   */
  Pad.prototype.update = function (delta) {
    let pos = this.body.position
    let angle = this.body.angle

    this.sprite.angle = angle
    this.sprite.x = pos.x
    this.sprite.y = pos.y
  }

  return Pad
})
  