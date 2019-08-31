const PIXI = require('pixi')
const GameObject = require('core/GameObject')

class Statistics extends GameObject {
  constructor () {
    super()

    this.paddingX = 10
    this.paddingY = 10

    this.setup()
  }

  /**
   * Setup the Statistics view
   */
  setup () {

    var style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 18,
      fill: ['#ffffff'], // gradient
    })
    this.fps = new PIXI.Text('FPS: ' + this.app.gameloop.FPS.toFixed(2), style)

    this.addChild(this.fps)
    this.x = this.paddingX
    this.y = this.app.screen.height - this.height - this.paddingY
  }

  /**
   * This update function is called every tick
   *
   * @param {number} delta - Tick delta
   */
  update (delta) {
    this.fps.text = 'FPS: ' + this.app.gameloop.FPS.toFixed(2)
  }
}

module.exports = Statistics
//
// define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
//   /**
//    * Statistics constructor
//    *
//    * @constructor
//    */
//   let Statistics = function () {
//     GameObject.call(this)
//     this.paddingX = 10
//     this.paddingY = 10
//
//     this.setup()
//   }
//
//   extend(Statistics, GameObject)
//
//   /**
//    * Setup the Statistics view
//    */
//   Statistics.prototype.setup = function () {
//
//     var style = new PIXI.TextStyle({
//       fontFamily: 'Arial',
//       fontSize: 18,
//       fill: ['#ffffff'], // gradient
//     })
//     this.fps = new pixi.Text('FPS: ' + this.app.gameloop.FPS.toFixed(2), style)
//
//     this.addChild(this.fps)
//     this.x = this.paddingX
//     this.y = this.app.screen.height - this.height - this.paddingY
//   }
//
//   Statistics.prototype.update = function (delta) {
//     this.fps.text = 'FPS: ' + this.app.gameloop.FPS.toFixed(2)
//   }
//
//   return Statistics
// })
