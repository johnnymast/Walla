define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  var Pad = function (texture) {
    PhysicsSprite.call(this, texture)
  }

  extend(Pad, PhysicsSprite)

  Pad.prototype.setupBody = function () {
    let options = {
      // friction: 0,
      // restitution: 0.95,
      isStatic: true
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.PhysicsManager.add(this.body)
  }

  Pad.prototype.update = function(delta)  {
    // Required
  }

  return Pad
})
  