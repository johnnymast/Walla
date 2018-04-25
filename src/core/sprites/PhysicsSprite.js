define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  var PhysicsSprite = function (texture) {
    GameObject.call(this)

    this.texture = texture
    this.sprite = new pixi.Sprite(texture)
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.childClass = Object.getPrototypeOf(this).constructor.name
    this.body = null
    this._x = 0
    this._y = 0

    if (typeof this.update === 'undefined') {
      console.warn('Please add the update method to ' + this.childClass)
    }

    this._width = this.texture.width
    this._height = this.texture.height

    this.setupBody()
    this.setupCollition()
  }

  extend(PhysicsSprite, GameObject)

  PhysicsSprite.prototype.sleep = function () {
    this.setProperty('isSleeping', true)
  }

  PhysicsSprite.prototype.wakeUp = function () {
    this.setProperty('isSleeping', false)
  }

  PhysicsSprite.prototype.setupCollition = function () {
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

  PhysicsSprite.prototype.onCollisionWith = function (withObject) {
    /**
     * You can overwrite this function if you wish
     * to receive collision events for this sprite.
     */
  }

  PhysicsSprite.prototype.setPosition = function (x = 0, y = 0) {

    x = x || this._x
    y = y || this._y

    this.PhysicsManager.setPosition(this.body, x, y, this._width, this._height)

    return this
  }

  PhysicsSprite.prototype.getPosition = function () {
    return this.body.position
  }

  PhysicsSprite.prototype.getX = function () {
    return this.body.position.x
  }

  PhysicsSprite.prototype.getY = function () {
    return this.body.position.y
  }

  PhysicsSprite.prototype.setX = function (x) {
    this.PhysicsManager.setPosition(this.body, x, this.getY(), this._width, this._height)
  }

  PhysicsSprite.prototype.setY = function (y) {
    this.PhysicsManager.setPosition(this.body, this.getX(), y, this._width, this._height)
  }

  PhysicsSprite.prototype.getProperty = function (key) {
    return this.body[key]
  }

  PhysicsSprite.prototype.setProperty = function (key, val) {
    this.body[key] = val
  }

  PhysicsSprite.prototype.setupBody = function () {
    /**
     * You can overwrite this function if you need to add your
     * own body shape and properties.
     */
    let options = {
      friction: 0,
      restitution: 0.95,
    }
    this.body = this.PhysicsManager.rectangle(this._x, this._y, this._width, this._height, options)
    this.PhysicsManager.add(this.body)
  }

  PhysicsSprite.prototype.update = function () {

  }

  return PhysicsSprite
})