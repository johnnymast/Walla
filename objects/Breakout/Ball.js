define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  var Ball = function (texture) {
    PhysicsSprite.call(this, texture)
  }

  extend(Ball, PhysicsSprite)

  Ball.prototype.setupBody = function () {
    var options = {
      friction: 10,
      restitution: 0.95,
    }

    this.body = this.PhysicsManager.circle(this.x, this.y, this._width, options)
    this.PhysicsManager.add(this.body)
  }

  Ball.prototype.update = function () {
    let pos = this.body.position
    let angle = this.body.angle

    this.sprite.x = pos.x
    this.sprite.y = pos.y
  }

  return Ball
})
