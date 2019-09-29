/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */
const GameEngine = require('core/GameEngine')

/**
 * World information class.
 * @class World
 */
class World {

  /**
   * World constructor
   * @param {object} options - World options
   */
  constructor (options) {

    let ge = GameEngine.get()
    let app = ge.get('App')

    let renderer = app.renderer

    this._size = options.size || new Prophecy.Geometry.Size(renderer.screen.width, renderer.screen.height)
  }

  /**
   * Return the world size
   * @returns {*|Prophecy.Geometry.size}
   */
  get size () {
    return this._size
  }
}

module.exports = World