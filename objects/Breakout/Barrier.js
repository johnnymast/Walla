define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  var Barrier = function (texture) {
    PhysicsSprite.call(this, texture)

    console.log(texture)
  }

  extend(Barrier, PhysicsSprite)

  Barrier.prototype.setupBody = function() {
    let options = {
        friction: 0,
        restitution: 0.95,
        isStatic: true
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options);
    this.PhysicsManager.add(this.body)
  }


  return Barrier
})
