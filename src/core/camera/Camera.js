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

  /**
   * Prophecy.Camera constructor.
   * @param {Prophecy.Game} game - The actual game
   * @param {Prophecy.World} world - The world
   * @param {Number} x - The x position of the camera
   * @param {Number} y - The y position of the camera
   * @param {Number} width - The width of the camera
   * @param {Number} height - The height the camera
   * @constructor
   */
  constructor (game, world, x, y, width, height) {
    super()

    this.game = game
    this.enableDebug = true
    this.deadzone = null
    this.world = world

    this.bounds = this.world.bounds // new Prophecy.Geometry.Rect(x, y, width, height)


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
     * @type {Prophecy.Geometry.Rect}
     */
    this.viewport = new Prophecy.Geometry.Rect(this.x, this.y, width, height)

    this.debug = new CameraInfo(this)

    this.addChild(this.debug)

    if (this.enableDebug) {
      this.debug.show()
    }
  }

  /**
   * Update the camera movement.
   */
  updateViewport () {

    let diff = {
      x: (this.target.x + this.target.width / 2) - this.viewport.halfwidth,
      y: (this.target.y + this.target.height / 2) - this.viewport.halfheight,
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

  /**
   * Validate the ViewPort coordinates.
   * @param {Number} x - The x coordinate
   * @param {Number} y - The y coordinate
   * @returns {boolean}
   */
  checkViewPortBounds (x, y) {

    if (this.world.bounds.outside(x, y)) {
      this.debug.options.lineWidth = 4
      return false
    } else {
      this.debug.options.lineWidth = 2
    }

    return true
  }

  /**
   * Start following the target.
   * @param {*} target - The object to follow
   * @param {Number} style - The follow style.
   */
  follow (target, style = Prophecy.Camera.FOLLOW_NONE) {

    this.target = target

    switch (style) {
      case Prophecy.Camera.FOLLOW_LOCKON:

        this.deadzone = new Prophecy.Geometry.Rect(
          (this.target.x + this.target.width / 2) - this.viewport.halfwidth,
          (this.target.y + this.target.height / 2) - this.viewport.halfheight,
          this.viewport.width,
          this.viewport.height)

        this.x = this.deadzone.x
        this.y = this.deadzone.y

        break

      default:
        this.deadzone = null
        break
    }
  }

  /**
   * Update the camera object.
   * @param {Number} delta - The time difference since last update.
   */
  update (delta) {

    this.updateViewport()

    if (this.enableDebug) {
      this.debug.update(delta)
    }
  }
}

Camera.FOLLOW_NONE = 0
Camera.FOLLOW_LOCKON = 1

module.exports = Camera