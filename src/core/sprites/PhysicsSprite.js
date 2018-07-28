define(['pixi', 'core/GameObject'], function (PIXI, GameObject) {

  /**
   * @classdesc PhysicsSprite
   * @exports  core/sprites/PhysicsSprite
   * @class
   */
  let PhysicsSprite = function (texture) {
    GameObject.call(this)


    if (typeof this.setupBody != 'function') {
      throw new Error('If you subclass PhysicsSprite you need to implement the setupBody() method.')
    }
    /**
     * @type {PIXI.Texture}
     */
    this.texture = texture

    /**
     * @type {PIXI.Sprite}
     */
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5

    /**
     * @type {string}
     */
    this.childClass = Object.getPrototypeOf(this).constructor.name

    /**
     *
     * @type {Body1}
     */
    this.body = null

    /**
     *
     * @type {number}
     * @private
     */
    this._x = 0

    /**
     *
     * @type {number}
     * @private
     */
    this._y = 0

    if (typeof this.update === 'undefined') {
      console.warn('Please add the update method to ' + this.childClass)
    }

    this._width = this.texture.width
    this._height = this.texture.height


    this.setupBody()
    this._setupCollision()
  }

  extend(PhysicsSprite, GameObject)

  /**
   * Setup collision events on the body.
   * @private
   */
  PhysicsSprite.prototype._setupCollision = function () {
    this.PhysicsManager.getEventHandler().on(this.PhysicsManager.getEngine(), 'collisionActive', (e) => {
      for (let pair of e.pairs) {
        let bodyA = pair.bodyA
        let bodyB = pair.bodyB

        if (bodyA === this.body) {
          this.onCollisionWith(bodyB)
        }
      }
    })
  }

  /**
   * Put a PhysicsSprite to sleep
   */
  PhysicsSprite.prototype.sleep = function () {
    this.setProperty('isSleeping', true)
  }

  /**
   * Wake up a PhysicsSprite from sleep.
   */
  PhysicsSprite.prototype.wakeUp = function () {
    this.setProperty('isSleeping', false)
  }

  /**
   * Callback for the onKeyPress even. You can overwrite this your self
   * to receive the onKeyPress call.

   * @param {Body} withObject - The body the PhysicsSprite body collides with.
   */
  PhysicsSprite.prototype.onCollisionWith = function (withObject) {
    /**
     * You can overwrite this function if you wish
     * to receive collision events for this sprite.
     */
  }

  /**
   * Set the position of the body.
   *
   * @param {number} x - The x coordinate
   * @param {number} y - The y coordinate
   * @returns {PhysicsSprite}
   */
  PhysicsSprite.prototype.setPosition = function (x = 0, y = 0) {

    x = x || this._x
    y = y || this._y

    this.PhysicsManager.setPosition(this.body, x, y, this._width, this._height)

    return this
  }

  /**
   * Return the body position.
   *
   * @returns {number}
   */
  PhysicsSprite.prototype.getPosition = function () {
    return this.body.position
  }

  /**
   * Return the body x position.
   *
   * @returns {number}
   */
  PhysicsSprite.prototype.getX = function () {
    return this.body.position.x
  }

  /**
   * Return the body y position.
   *
   * @returns {number}
   */
  PhysicsSprite.prototype.getY = function () {
    return this.body.position.y
  }

  /**
   * Set the body x position
   *
   * @param {number} x - The x position
   */
  PhysicsSprite.prototype.setX = function (x) {
    this.PhysicsManager.setPosition(this.body, x, this.getY(), this._width, this._height)
  }

  /**
   * Set the body y position
   *
   * @param {number} y - The y position
   */
  PhysicsSprite.prototype.setY = function (y) {
    this.PhysicsManager.setPosition(this.body, this.getX(), y, this._width, this._height)
  }

  /**
   * Return a property of the body.
   *
   * @param {string} key - Property key
   * @returns {*}
   */
  PhysicsSprite.prototype.getProperty = function (key) {
    return this.body[key]
  }

  /**
   * Set a property on the body.
   *
   * @param {string} key - Property key
   * @param {string} val - Property value
   */
  PhysicsSprite.prototype.setProperty = function (key, val) {
    this.body[key] = val
  }

  /**
   * PhysicsSprite update function. For now this is unused.
   *
   * @param {number} delta - The delta since the last tick
   */
  PhysicsSprite.prototype.update = function (delta) {
    // unused for new
  }

  return PhysicsSprite
})