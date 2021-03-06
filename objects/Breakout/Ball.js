const PhysicsSprite = require('./PhysicsSprite')

class Ball extends PhysicsSprite {

  /**
   * Setup the physics body. This is part of the PhysicsSprite.
   */
  setupBody () {
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

  /**
   * Fire the ball of the paddle.
   * @param {number} [force=10] - Fire the ball with this force.
   */
  fire (force = 10) {
    this.PhysicsManager.setVelocity(this.body, { x: force, y: force })
  }

  /**
   * Reset the ball velocity.
   */
  reset () {
    this.PhysicsManager.setVelocity(this.body, { x: 0, y: 0 })
  }

  /**
   * Update the ball object.
   *
   * @param {number} delta - the time difference since last tick.
   */
  update (delta) {
    let pos = this.body.position
    let angle = this.body.angle

    this.sprite.angle = angle
    this.sprite.x = pos.x
    this.sprite.y = pos.y
  }
}

module.exports = Ball