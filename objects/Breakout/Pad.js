define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  var Pad = function (texture) {
    PhysicsSprite.call(this, texture)
  }

  extend(Pad, PhysicsSprite)

  Pad.prototype.setupBody = function () {
    let options = {
      isStatic: true,
      restitution: 1.5,
      friction: 1,
      chamfer: 10
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name
    this.PhysicsManager.add(this.body)
  }

  Pad.prototype.update = function(delta)  {
    // Required
  }

  return Pad
})
  