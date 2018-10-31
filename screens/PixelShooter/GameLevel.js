define([ 'core/Level', 'gui/Statistics'], function (Level, Statistics) {
  var GameLevel = function (options) {
    Level.call(this, options)

    /**
     * Add the FPS counter.
     */
    this.statistics = new Statistics()
  }

  extend(GameLevel, Level)

  GameLevel.prototype.setDisplayStats = function (visible) {
    this.statistics.visible = visible
    this.addChild(this.statistics)
  }

  GameLevel.prototype.fixedUpdate = function(delta) {
    // Empty
  }

  GameLevel.prototype.update = function(delta) {
    this.statistics.update(delta)
  }

  return GameLevel
})
