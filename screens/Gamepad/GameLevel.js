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
//
// define(['pixi', 'matter-js', 'core/Level', 'core/input/Keyboard/KeyboardInput', 'gui/Statistics'], function (pixi, Matter, Level, KeyboardInput, Statistics) {
//   var GameLevel = function (options) {
//     Level.call(this, options)
//
//
//     this.statistics = new Statistics()
//     this.addChild(this.statistics)
//   }
//
//   extend(GameLevel, Level)
//
//
//   /**
//    * Switch the FPS counter on/off.
//    * @param {boolean} visible - should the FPS tracker be visible.
//    */
//   GameLevel.prototype.setDisplayStats = function (visible = false) {
//     this.statistics.visible = visible
//   }
//
//   /**
//    * The onInit callback.
//    */
//   GameLevel.prototype.onInit = function () {
//
//   }
//
//   /**
//    * Update the game scene.
//    * @param {number} delta - the time passed since last tick.
//    */
//   GameLevel.prototype.update = function (delta) {
//     this.statistics.update(delta)
//   }
//
//   return GameLevel
// })
