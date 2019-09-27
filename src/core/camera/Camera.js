/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

/**
 * Camera class
 * @extends PIXI.Container
 * @class Prophecy.Camera
 */
class Camera extends PIXI.Container {
  constructor (frame) {
    super({ backgroundColor: 0x1099bb })

    if (!frame instanceof Prophecy.Geometry.Rect) {
      throw new Error('Argument error: Did not pass a Rect')
    }

    this.target = null
    this.deadzone = null

    this.x = frame.x
    this.y = frame.y

    // this.mask = maskG

    console.log('test', frame instanceof Prophecy.Geometry.Rect)
  }

  follow (target, style = Prophecy.Camera.FOLLOW_NONE) {

    switch (style) {
      case Prophecy.Camera.FOLLOW_LOCKON:
        let w = this.width / 8
        let h = this.height / 3
        this.deadzone = new Prophecy.Geometry.Rect((this.width - w) / 2, (this.height - h) / 2 - h * 0.25, w, h)

        console.log('Simple follow')
        break

      default:
        this.deadzone = null
        break
    }

    this.target = target
  }

  unfollow () {
    this.target = null
  }

  update () {
    // console.log('delta update')
  }
}

Camera.FOLLOW_NONE = 0
Camera.FOLLOW_LOCKON = 1

module.exports = Camera