define(['core/GameObject'], function (GameObject) {
  let Character = function () {
    GameObject.call(this, null)

    /**
     * Character number
     */
    this.cn = 1

    this.animations = {
      north: {
        animation: null,
        frameWidth: 20,
        frameHeight: 21,
        frames: 4,
      },
      side: {
        animation: null,
        frameWidth: 20,
        frameHeight: 24,
        frames: 4,
      }
    }

    this.setupAnimations()
  }

  extend(Character, GameObject)

  Character.prototype.setupAnimations = function () {

    let step = 0
    for (let name in this.animations) {
      let info = this.animations[name]
      let frameId = this.cn + '_' + name
      let sourceTexture = PIXI.Texture.fromFrame(frameId)
      let frames = []

      let x = sourceTexture.frame.x -2
      let y = sourceTexture.frame.y
      for (let i = 0; i < info.frames; i++) {
        let subTexture = new PIXI.Texture(sourceTexture.baseTexture,
          new PIXI.Rectangle(x, y, info.frameWidth, info.frameHeight),
          new PIXI.Rectangle(0, 0, info.frameWidth, info.frameHeight)
        )


        frames.push(subTexture)
        x += info.frameWidth
      }

      info.animation = new PIXI.extras.AnimatedSprite(frames)
      info.animation.x = 400 + (step * 100)
      info.animation.y = 400 + (step * 100)

      info.animation.scaleX = 2.5
      info.animation.scaleY = 2.5


      info.animation.animationSpeed = 0.3
      info.animation.play()


      this.addChild(info.animation)
      step ++;
    }
  }

  return Character
})