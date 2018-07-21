define(['pixi'], function (PIXI) {

  /**
   * @classdesc GameEngine
   * @exports  core/GameEngine
   * @class
   */
  let GameEngine = function () {
    PIXI.utils.EventEmitter.call(this)
  }

  extend(GameEngine, PIXI.utils.EventEmitter)

  /**
   * Return a signleton version of the GameEngine
   * object.
   *
   * @returns {GameEngine}
   */
  GameEngine.get = function () {
    if (!GameEngine.current) {
      GameEngine.current = new GameEngine()
    }

    return GameEngine.current
  }

  /**
   * Return a cached object.
   *
   * @param {string} key - Cache key for an object
   * @returns {*}
   */
  GameEngine.prototype.get = function (key) {
    return this[key]
  }

  /**
   * Cache a given object object under given key.
   *
   * @param {string} key - The key to cache the object as
   * @param {string} value - The object to add to the cache
   */
  GameEngine.prototype.set = function (key, value) {
    GameEngine.current.emit('set' + key, value)

    this[key] = value
  }

  return GameEngine
})
