const Vector2d = require('core/math/vector2d')

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
    this.status = 'visible'
    this.point_value = 2

    if (type === 'green') {
      this.health = 2
      this.point_value = 5
    }

    this.resetFlicker()
  }

  extend(Brick, PhysicsSprite)

  /**
   * Return the points gained from this brick.
   * @returns {number}
   */
  Brick.prototype.getPointValue = function() {
    return this.point_value;
  }

  /**+
   * Reset the flicker animation.
   */
  Brick.prototype.resetFlicker = function () {
    this.flicker_speed = 4
    this.flicker_delay = 1.5
    this.flicker_delta = 0
    this.flicker_phase = 0
    this.flicker_count = 0
    this.flicker_max = 25
  }

  /**
   * This function is internally called by the PhysicsSprite if
   * an collision is detected.
   *
   * @param {Body} withObject
   */
  Brick.prototype.onCollisionWith = function (withObject) {
    if (this.health === 0) {
      this.PhysicsManager.remove(this.body)
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

  Brick.prototype.showHit = function () {
    this.status = 'hit'
  }

  /**
   * Remove 1 from the bricks health.
   */
  Brick.prototype.decareaseHealth = function () {
    this.health--
  }

  /**
   * Return the number of health points for this brick.
   * @returns {number}
   */
  Brick.prototype.getHealth = function () {
    return this.health
  }

  /**
   * Ask if the brick is destroyed or not.
   * @returns {boolean}
   */
  Brick.prototype.isDestroyed = function () {
    return (this.status === 'destroyed')
  }

  /**
   * Destroy the brick.
   */
  Brick.prototype.destroy = function () {
    this.sprite.alpha = 0
    this.sprite.destroy()

    this.PhysicsManager.remove(this.body)
  }

  /**
   * Update the physics of the brick.
   * @param {number} delta - The delta since last tick
   */
  Brick.prototype.update = function (delta) {

    let pos = this.body.position
    let angle = this.body.angle

    this.sprite.angle = angle
    this.sprite.x = pos.x
    this.sprite.y = pos.y

    if (this.status === 'hit') {
      this.flicker_delta += delta

      if (this.flicker_delta > this.flicker_delay) {
        this.flicker_delta = 0
        this.flicker_phase += Math.PI * delta * 2 * this.flicker_speed

        this.sprite.alpha = Math.abs(Math.sin(this.flicker_phase))

        if (this.flicker_count == this.flicker_max) {
          this.resetFlicker()

          if (this.health == 0) {
            this.status = 'destroyed'
          } else {
            this.status = 'visible'
            this.sprite.alpha = 1
          }
        }

        this.flicker_count++
      }
    }
  }

  return Brick
})
