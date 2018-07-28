define(['core/sprites/PhysicsSprite'], function (PhysicsSprite) {

  /**
   * Brick constructor.
   *
   * @param {string} type - the type of brick red/green/blue
   * @param {PIXI.Texture} texture - the texture for this brick
   * @constructor
   */
  let Brick = function (type, texture) {
    PhysicsSprite.call(this, texture)
    this.type = type
    this.health = 1

    if (type === 'green') {
      this.health = 2
    }
  }

  extend(Brick, PhysicsSprite)

  /**
   * This function is internally called by the PhysicsSprite if
   * an collision is detected.
   *
   * @param {Body} withObject
   */
  Brick.prototype.onCollisionWith = function(withObject) {
    if (this.health === 0) {
      this.PhysicsManager.remove(this.body);
      this.sprite.visible = false
    } else
    this.decareaseHealth()
  }

  /**
   * Create the Brick object with physics properties.
   * This function is internally called by the PhysicsSprite class.
   */
  Brick.prototype.setupBody = function () {
    let options = {
      isStatic: true,
      restitution: 1.5
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name
    this.PhysicsManager.add(this.body)
  }

  /**
   * Remove 1 from the bricks health.
   */
  Brick.prototype.decareaseHealth = function () {
    this.health--
  }

  /**
   * Update the physics of the brick.
   *
   * @param {number} delta - The delta since last tick
   */
  Brick.prototype.update = function (delta) {
    let pos = this.body.position
    let angle = this.body.angle

    this.sprite.angle = angle
    this.sprite.x = pos.x
    this.sprite.y = pos.y
  }

  return Brick
})
