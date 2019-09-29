const Level = require('core/Level')
const Statistics = require('gui/Statistics')

class GameLevel extends Level {
  constructor (options) {
    super(options)

    this.statistics = new Statistics()
    this.addChild(this.statistics)
  }

  /**
   * Switch the FPS counter on/off.
   * @param {boolean} visible - should the FPS tracker be visible.
   */
  setDisplayStats (visible = false) {
    this.statistics.visible = visible
  }

  /**
   * The onInit callback.
   */
  onInit () {

  }

  /**
   * Update the game scene.
   * @param {number} delta - the time passed since last tick.
   */
  update (delta) {
    this.statistics.update(delta)
  }
}

module.exports = GameLevel
