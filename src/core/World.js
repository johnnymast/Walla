/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */
const GameEngine = require('core/GameEngine')

/**
 * World information class.
 * @class Prophecy.World
 */
class World {

  /**
   * World constructor
   * @param {object} options - World options
   */
  constructor (options) {

    let ge = GameEngine.get()
    let game = ge.get('Game')

    this.size = options.size
    this.camera = new Prophecy.Camera(game, this, 0, 0, this.size.width, this.size.height)

    this.setBounds(0, 0, this.size.width, this.size.height)
    this.setViewPort(0, 0, this.size.width, this.size.height)
  }

  /**
   *
   * @param {Number} [x=0] - The x coordinate.
   * @param {Number} [y=0] - The y coordinate.
   * @param {Number} [width=0] - The width of the world.
   * @param {Number} [height=0] - The height of the world.
   */
  setBounds (x = 0, y = 0, width = 0, height = 0) {
    this._bounds = new Prophecy.Geometry.Rect(x, y, width, height)
  }

  /**
   *
   * @param {Number} [x=0] - The x coordinate.
   * @param {Number} [y=0] - The y coordinate.
   * @param {Number} [width=0] - The width of the world.
   * @param {Number} [height=0] - The height of the world.
   */
  setViewPort (x = 0, y = 0, width = 0, height = 0) {
    this._viewport = new Prophecy.Geometry.Rect(x, y, width, height)

    if (this.camera.bounds) {
      this.camera.bounds.set(x, y, Math.max(width, this.size.width), Math.max(height, this.size.height))
    }
  }

  /**
   * Return the center of the world
   * @returns {Prophecy.Geometry.Point}
   */
  get center () {
    return new Prophecy.Geometry.Point(this.bounds.halfwidth, this.bounds.halfheight)
  }

  /**
   * Return the world bounds.
   * @returns {Prophecy.Geometry.Rect}
   */
  get bounds () {
    return this._bounds
  }

  get viewport () {
    return this._viewport
  }

  /**
   * Update the world object.
   * @param {Number} delta - The time difference since last update.
   */
  update (delta) {
    this.camera.update(delta)
  }
}

module.exports = World