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
   * @param {string|PIXI.Texture} texture - PIXI texture object.
   * @param {number} [x=0] - The x position of this sprite.
   * @param {number} [y=0] - The y position of this object.
   * @returns {PIXI.Sprite}
   */
  sprite (texture = null, x = 0, y = 0) {

    if (!texture instanceof PIXI.Texture) {
      throw new Error('GameObjectFactory:sprite invalid texture.')
    }

    let sprite = new PIXI.Sprite(texture)
    sprite.x = x
    sprite.y = y

    return sprite
  }

  /**
   * Create a new TilingSprite.
   * @param {string|PIXI.Texture} texture - PIXI texture object..
   * @param {number} [width=0] - The x position of this sprite.
   * @param {number} [height=0] - The y position of this object.
   * @returns {PIXI.extras.TilingSprite}
   */
  tilingSprite (texture = null, width = 0, height = 0) {
    return new PIXI.extras.TilingSprite(texture, width, height)
  }
}

module.exports = GameObjectFactory