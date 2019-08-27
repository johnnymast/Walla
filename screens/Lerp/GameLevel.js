define(['pixi', 'core/Level', 'gui/Statistics'], function (PIXI, Level, Statistics) {
  var GameLevel = function (options) {
    Level.call(this, options)

    this.interactive = true
    this.statistics = new Statistics()
    this.addChild(this.statistics)
  }

  extend(GameLevel, Level)


  /**
   * Switch the FPS counter on/off.
   * @param {boolean} visible - should the FPS tracker be visible.
   */
  GameLevel.prototype.setDisplayStats = function (visible = false) {
    this.statistics.visible = visible
  }

  /**
   * The onStart callback.
   */
  GameLevel.prototype.onInit = function () {
    // Empty
  }

  /**
   * Update the game scene.
   * @param {number} delta - the time passed since last tick.
   */
  GameLevel.prototype.update = function (delta) {
    this.statistics.update(delta)
  }

  return GameLevel
})
