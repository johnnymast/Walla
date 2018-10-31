const DIRECTIONS = require('objects/Pixelshooter/Options').DIRECTIONS
define(['core/GameObject'], function (GameObject) {
  let Character = function (playerId = 1) {
    GameObject.call(this, null)

    /**
     * Character number
     */
    this.cn = playerId
    this.animations = PIXI.loader.resources['pixelshooter_character_animations'].data
    this.animationspeed = 0.3
    this.direction = DIRECTIONS.DOWN

    this.setupAnimations()
    this.setDirection(this.direction)
  }

  extend(Character, GameObject)

  /**
   *
   * @param direction
   * @returns {boolean}
   */
  Character.prototype.setDirection = function (direction) {
    if (this.animations[direction]) {
      if (typeof this.animation !== 'undefined') {
        this.removeChild(this.animation)
      }

      this.animation = this.animations[direction]['animation']
      this.animation.animationSpeed = this.animationspeed
      // this.animation.position = this.position
      this.animation.play()

      this.direction = direction
      this.addChild(this.animation)
      return true
    }
    return false
  }

  /**
   *
   */
  Character.prototype.setupAnimations = function () {

    for (let name in this.animations) {
      let info = this.animations[name]
      let frameId = this.cn + '_' + info.key
      let sourceTexture = PIXI.Texture.fromFrame(frameId)
      let frames = []

      let x = sourceTexture.frame.x
      let y = sourceTexture.frame.y
      let spacer = 1

      for (let i = 0; i < info.frames; i++) {
        let size = {
          w: Math.floor(sourceTexture.frame.width / info.frames) + spacer,
          h: sourceTexture.frame.height,
        }

        let subTexture = new PIXI.Texture(sourceTexture.baseTexture,
          new PIXI.Rectangle(x, y, size.w -spacer, size.h),
          new PIXI.Rectangle(0, 0, size.w -spacer, size.h)
        )

        frames.push(subTexture)
        x += size.w
      }

      let animation = new PIXI.extras.AnimatedSprite(frames)

      if (typeof info.flipx !== 'undefined') {
        animation.scale.x = info.flipx
      }

      this.animations[name]['animation'] = animation
    }
  }

  GameObject.prototype.update = function (delta) {

  }

  return Character
})