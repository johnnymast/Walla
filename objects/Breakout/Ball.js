const filters = require('pixi-filters')

define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  let Ball = function (texture) {
    PhysicsSprite.call(this, texture)

    this.sprite.filters = [new filters.OutlineFilter(2, 0x99ff99)]
  }

  extend(Ball, PhysicsSprite)

  Ball.prototype.setupBody = function () {
    let options = {
      isSleeping: true,
      mass: 1,
      inertia: 0,
      friction: 0,
      restitution: 1,
      frictionStatic: 0,
      frictionAir: 0,
    }

    this.body = this.PhysicsManager.circle(this._x, this._y, this._width / 2, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name

    this.PhysicsManager.add(this.body)
  }

  Ball.prototype.fire = function () {
    console.log('Fire ball')
    let force = 10
    this.PhysicsManager.setVelocity(this.body, {x: force, y: force})
  }

  Ball.prototype.update = function (delta) {
    let pos = this.body.position
    let angle = this.body.angle

    this.sprite.angle = angle
    this.sprite.x = pos.x
    this.sprite.y = pos.y
  }

  return Ball
})
