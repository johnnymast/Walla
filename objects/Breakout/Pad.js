const PhysicsSprite = require('./PhysicsSprite')

class Pad extends PhysicsSprite {

  /**
   * Setup the physics object. This is part of the PhysicsSprite.
   */
  setupBody () {
    let options = {
      isStatic: true
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.body.label = Object.getPrototypeOf(this).constructor.name
    this.PhysicsManager.add(this.body)
  }

  /**
   * Update the Pad object.
   * @param {number} delta - the number of ticks since last update.
   */
  update (delta) {
    let pos = this.body.position
    this.sprite.angle = this.body.angle
    this.sprite.x = pos.x
    this.sprite.y = pos.y
  }

}
module.exports = Pad