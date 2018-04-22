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

  Brick.prototype.onCollisionWith = function(withObject) {
    if (this.health === 0 && this.type === 'blue') {
      this.PhysicsManager.remove(this.body);
      this.sprite.visible = false
      console.log(this.childClass, 'collides with', withObject.label)
      console.log('Removed', this.body.id)
    } else
    this.decareaseHealth()
  }

  Brick.prototype.setupBody = function () {
    let options = {
      isStatic: true,
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name
    this.PhysicsManager.add(this.body)
  }

  Brick.prototype.decareaseHealth = function () {
    this.health--
  }

  return Brick
})
