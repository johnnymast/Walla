define(['core/Level', 'gui/Statistics'], function (Level, Statistics) {
  /**
   * GameLevel Constructor
   *
   * @constructor
   */
  let GameLevel = function () {
    Level.call(this)

    /**
     * Add the FPS counter.
     */
    this.statistics = new Statistics()
  }

  extend(GameLevel, Level)

  /**
   * The onStart callback
   */
  GameLevel.prototype.onInit = function () {
    let background = new PIXI.Graphics()
    background.name = 'background'

    background.lineStyle(2, 0xFF0000, 1)
    background.beginFill(0xFFFFFF, 0)
    background.drawRect(
      0,
      0,
      this.app.screen.width,
      this.app.screen.height,
    )

    this.addChild(background);
    this.setDisplayStats(true)
  }

  /**
   * Enable or disable the onscreen FPS counter.
   *
   * @param {boolean) visible - The FPS counter visibility flag true|false
   */
  GameLevel.prototype.setDisplayStats = function (visible) {
    this.statistics.visible = visible
    this.addChild(this.statistics)
  }

  /**
   * Update the GameLevel scene.
   *
   * @param delta
   */
  GameLevel.prototype.update = function (delta) {
    this.statistics.update(delta)
  }

  return GameLevel
})
