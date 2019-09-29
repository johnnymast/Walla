/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const PIXI = require('pixi')

/**
 * ObjectGateWay factory class.
 */
class GameObjectFactory {
  constructor () {

  }

  /**
   * Create a new Sprite.
   * @param {string|PIXI.Texture} texture - Texture name or object.
   * @param {number} [x=0] - The x position of this sprite.
   * @param {number} [y=0] - The y position of this object.
   * @returns {PIXI.ObservablePoint}
   */
  sprite (texture = '', x = 0, y = 0) {

    if (typeof texture == 'string') {
      texture = new PIXI.Texture.fromImage(texture)
    }

    let sprite = new PIXI.Sprite(texture)
    sprite.x = x
    sprite.y = y

    return sprite
  }
}

module.exports = GameObjectFactory