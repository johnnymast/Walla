/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */
const CameraInfo = require('./CameraInfo')

/**
 * Camera class
 * @extends PIXI.Container
 * @class Prophecy.Camera
 */
class Camera extends PIXI.Container {
  constructor (game, world, x, y, width, height) {
    super()

    this.game = game
    this.enableDebug = true

    this.x = x
    this.y = y
    this.w = 300 //width
    this.h = 300 //height

    // this.w = width
    // this.h = height


    this.deadzone = null

    this.world = world

    this.bounds = new Prophecy.Geometry.Rect(this.x, this.y, this.w, this.h)

    /**
     * The target we want the camera to follow.
     * @type {*}
     */
    this.target = null

    /**
     * ----------------------------------
     * |     |-----| <--- Viewport rect
     * |     |     |
     * |     |     |
     * |     |-----|
     * ----------------------------------
     * This is the part the player looks trough
     * @type {PIXI.Geometry.Rect}
     */
    this.viewport = new Prophecy.Geometry.Rect(this.x, this.y, this.w, this.h)

    this.debug = new CameraInfo(this)

    this.addChild(this.debug)

    if (this.enableDebug) {
      console.log('show debug')
      this.debug.show()
    }

  }

  updateViewport () {

    let diff = {
      x: (this.target.x + this.target.width / 2) - this.viewport.width / 2,
      y: (this.target.y + this.target.height / 2) - this.viewport.height / 2,
    }

    if (this.checkViewPortBounds(diff.x, diff.y)) {
      this.x = diff.x
      this.y = diff.y

      this.viewport.x = this.x
      this.viewport.y = this.y

      if (game.stage) {
        game.stage.x = -this.viewport.x
        game.stage.y = -this.viewport.y
      }
    }
  }

  checkViewPortBounds (x, y) {

    if (x < 1 || x > this.bounds.width - this.viewport.width) {
      this.debug.options.lineWidth = 4
      return false
    } else {
      this.debug.options.lineWidth = 2
    }

    if (y < 1 || y > this.bounds.height - this.viewport.height) {
      this.debug.options.lineWidth = 4
      return false
    } else {
      this.debug.options.lineWidth = 2
    }

    return true
  }

  follow (target, style = Prophecy.Camera.FOLLOW_NONE) {

    this.target = target

    switch (style) {
      case Prophecy.Camera.FOLLOW_LOCKON:

        this.deadzone = new Prophecy.Geometry.Rect(
          (this.target.x + this.target.width / 2) - this.bounds.width / 2,
          (this.target.y + this.target.height / 2) - this.bounds.height / 2,
          this.bounds.width,
          this.bounds.height)

        this.x = this.deadzone.x
        this.y = this.deadzone.y

        break

      default:
        this.deadzone = null
        break
    }

  }

  update (delta) {

    this.updateViewport()

    if (this.enableDebug) {
      this.debug.update()
    }
  }
}

Camera.FOLLOW_NONE = 0
Camera.FOLLOW_LOCKON = 1

module.exports = Camera