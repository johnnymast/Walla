const Level = require('core/level')
const Statistics = require('gui/Statistics')

class GameLevel extends Level {
  constructor () {
    super()
    
    /**
     * Add the FPS counter.
     */
    this.statistics = new Statistics()
  }

  /**
   * The onStart callback
   */
  onInit () {
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

    this.addChild(background)
    this.setDisplayStats(true)
  }

  /**
   * Enable or disable the onscreen FPS counter.
   *
   * @param {boolean) visible - The FPS counter visibility flag true|false
   */
  setDisplayStats (visible) {
    this.statistics.visible = visible
    this.addChild(this.statistics)
  }

  /**
   * Update the GameLevel scene.
   *
   * @param delta
   */
  update (delta) {
    this.statistics.update(delta)
  }
}

module.exports = GameLevel
