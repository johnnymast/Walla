const filters = require('pixi-filters');

define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  var Ball = function (texture) {
    PhysicsSprite.call(this, texture)

    this.sprite.filters = [new filters.OutlineFilter(2, 0x99ff99)]
  }

  extend(Ball, PhysicsSprite)

  Ball.prototype.setupBody = function () {
    let radius = this._width

    let options = {
      // isSleeping: true,
      // isStatic: true,
     //  inertia: Infinity,
     //  isSensor: true,
     //  label: this._id,
     //  mass: 1,
     //  restitution: 1,
    }

    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name
    this.PhysicsManager.add(this.body)
  }

  Ball.prototype.fire = function () {
    // this.PhysicsManager.setVelocity(this.body, {x: 0, y:  rand(-2, 2)})
    // this.PhysicsManager.setAngularVelocity(this.body, 0);
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
