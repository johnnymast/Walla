const DIRECTIONS = require('objects/Pixelshooter/Options')
const GameObject = require('core/GameObject')

class Character extends GameObject {
  constructor (playerId = 1) {
    super()

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

  /**
   *
   * @param direction
   * @returns {boolean}
   */
  setDirection (direction) {
    if (this.animations[direction]) {
      if (typeof this.animation !== 'undefined') {
        this.removeChild(this.animation)
      }

      this.animation = this.animations[direction]['animation']
      this.animation.animationSpeed = this.animationspeed
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
  setupAnimations () {

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
          new PIXI.Rectangle(x, y, size.w - spacer, size.h),
          new PIXI.Rectangle(0, 0, size.w - spacer, size.h)
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

  update (delta) {
    // overwrite
  }
}

module.exports = Character