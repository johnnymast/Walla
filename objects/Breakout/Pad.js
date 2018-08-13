define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  let Pad = function (texture) {
    PhysicsSprite.call(this, texture)
  }

  extend(Pad, PhysicsSprite)

  Pad.prototype.setPosition = function (x = 0, y = 0) {

    console.log('Pad setting y to ', this.body)
    this.PhysicsManager.setPosition(this.body, x, y, this._width, this._height)
    return this
  }


  Pad.prototype.setupBody = function () {
    let options = {
      isStatic: true,
      // inertia: 0,
      // frictionStatic: 1,
      // isStatic: true,
      // frictionAir: 0,
      // friction: 0,
      // restitution: 1
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name
    this.PhysicsManager.add(this.body)
  }

  Pad.prototype.update = function(delta)  {
    let pos = this.body.position
    let angle = this.body.angle

    this.sprite.angle = angle
    this.sprite.x = pos.x
    this.sprite.y = pos.y
  }

  return Pad
})
  