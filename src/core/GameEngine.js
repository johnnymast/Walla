define(['pixi'], function (PIXI) {
  let GameEngine = function () {
    PIXI.utils.EventEmitter.call(this)
  }

  extend(GameEngine, PIXI.utils.EventEmitter)

  GameEngine.get = function () {
    if (!GameEngine.current) {
      GameEngine.current = new GameEngine()
    }

    return GameEngine.current
  }

  GameEngine.prototype.get = function (index) {
    return this[index]
  }

  GameEngine.prototype.set = function (index, value) {
    GameEngine.current.emit('set' + index, value)

    this[index] = value
  }

  return GameEngine
})
