const PIXI = require('pixi')

class GameEngine extends PIXI.utils.EventEmitter {

  /**
   * Return a singleton instance of the GameEngine
   *
   * @returns {GameEngine}
   */
  static get () {
    if (!this.current) {
      this.current = new GameEngine()
    }
    return this.current
  }

  /**
   * Cache a given object object under given key.
   *
   * @param {string} key - The key to cache the object as
   * @param {string} value - The object to add to the cache
   */
  set (key, value) {
    GameEngine.current.emit('set' + key, value)

    this[key] = value
  }

  /**
   * Return a signleton version of the GameEngine
   * object.
   *
   * @returns {GameEngine}
   */
  get (key) {
    return this[key]
  }
}

module.exports = GameEngine