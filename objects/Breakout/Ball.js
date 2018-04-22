define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  var Ball = function (texture) {
    PhysicsSprite.call(this, texture)
  }

  extend(Ball, PhysicsSprite)

  Ball.prototype.setupBody = function () {
    let options = {}

    let width = this._width
    // width = 12
    this.body = this.PhysicsManager.circle(this.x, this.y, width, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name
    this.PhysicsManager.add(this.body)
  }

  Ball.prototype.fire = function () {
    this.PhysicsManager.setVelocity(this.body, {x: 0, y:  rand(-2, 2)})
  }

  Ball.prototype.update = function () {
    let pos = this.body.position
    let angle = this.body.angle

    this.sprite.angle = angle
    this.sprite.x = pos.x
    this.sprite.y = pos.y
  }

  return Ball
})
