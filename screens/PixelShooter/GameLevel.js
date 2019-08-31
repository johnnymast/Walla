const Level = require('core/Level')
const Statistics = require('gui/Statistics')

class GameLevel extends Level {
  constructor (props) {
    super(props)

    /**
     * Add the FPS counter.
     */
    this.statistics = new Statistics()
  }

  setDisplayStats (visible) {
    this.statistics.visible = visible
    this.addChild(this.statistics)
  }

  fixedUpdate (delta) {
    // Empty
  }

  update (delta) {
    this.statistics.update(delta)
  }

}

module.exports = GameLevel
