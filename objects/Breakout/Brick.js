const Vector2d = require('core/math/vector2d')
const PhysicsSprite = require('./PhysicsSprite')

class Brick extends PhysicsSprite {
  constructor (type, texture) {
    super(texture)
    
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

  /**+
   * Reset the flicker animation.
   */
  resetFlicker () {
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
  onCollisionWith (withObject) {
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
  setupBody () {
    let options = {
      isStatic: true,
      restitution: 1.5
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name
    this.PhysicsManager.add(this.body)
  }

  showHit () {
    this.status = 'hit'
  }

  /**
   * Remove 1 from the bricks health.
   */
  decareaseHealth () {
    this.health--
  }

  /**
   * Return the number of health points for this brick.
   * @returns {number}
   */
  getHealth () {
    return this.health
  }

  /**
   * Ask if the brick is destroyed or not.
   * @returns {boolean}
   */
  isDestroyed () {
    return (this.status === 'destroyed')
  }

  /**
   * Destroy the brick.
   */
  destroy () {
    this.sprite.alpha = 0
    this.sprite.destroy()

    this.PhysicsManager.remove(this.body)
  }

  /**
   * Update the physics of the brick.
   * @param {number} delta - The delta since last tick
   */
  update (delta) {

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
}

module.exports = Brick
