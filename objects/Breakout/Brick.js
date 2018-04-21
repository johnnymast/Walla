define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  var Brick = function (type, texture) {
    PhysicsSprite.call(this, texture)
    this.type = type
    this.health = 1

    if (type === 'green') {
      this.health = 2
    }
  }

  extend(Brick, PhysicsSprite)

  Brick.prototype.setupBody = function () {
    let options = {
      friction: 0,
      restitution: 0.95,
      isStatic: true
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.PhysicsManager.add(this.body)
  }

  Brick.prototype.decareaseHealth = function () {
    this.health--
  }

  Brick.prototype.update = function () {
    let pos = this.body.position
    let angle = this.body.angle

    // this.sprite.x = pos.x
    // this.sprite.y = pos.y
  }

  return Brick
})
