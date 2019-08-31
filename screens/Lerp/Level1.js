const PIXI = require('pixi')
const GameLevel = require('screens/Lerp/GameLevel')
const Circle = require('objects/Lerp/Circle')

class Level1 extends GameLevel {
  constructor () {
    super()

    /**
     *
     * @type {number}
     */
    this.delay = 2

    /**
     *
     * @type {number}
     */
    this.time_passed = 0

    /**
     *
     * @type {number}
     */
    this.circle_radius = 20

    /**
     *
     * @type {null}
     */
    this.lerp_to = null
  }

  /**
   * onStart callback
   */
  onInit () {
    GameLevel.prototype.onStart.call(this)

    /**
     * @type {Circle}
     */
    this.circle = new Circle(this.circle_radius)

    /**
     * @type {PIXI.TextStyle}
     */
    let textStyle = new PIXI.TextStyle({
      fontFamily: 'Helvetica',
      fontSize: 20,
      fill: ['#ffffff'],
    })

    /*
     * @type {PIXI.Text}
     */
    this.richText = new PIXI.Text('Move your mouse', textStyle)
    this.richText.x = this.app.renderer.screen.width / 2 - this.richText.width / 2

    this.addChild(this.richText)
    this.addChild(this.circle)
  }

  /**
   * Handle the mousemove event
   *
   * @param {PIXI.interaction.InteractionEvent} event - The event for mousemove
   */
  onMouseMove (event) {
    let pos = event.data.global
    this.lerp_to = pos
  }

  /**
   * Update the game scene.
   *
   * @param {number} delta - the time passed since last tick.
   */
  update (delta) {
    GameLevel.prototype.update.call(this, delta)
    this.circle.update(delta)

    this.time_passed += delta
    if (this.time_passed > this.delay) {

      if (this.lerp_to) {
        this.circle.position.x = lerp(this.circle.position.x, this.lerp_to.x, 0.3)
        this.circle.position.y = lerp(this.circle.position.y, this.lerp_to.y, 0.3)
      }

      this.time_passed = 0
    }
  }

}

module.exports = Level1

// define(['pixi', 'screens/Lerp/GameLevel', 'objects/Lerp/Circle'], function (PIXI, GameLevel, Circle) {
//
//   /**
//    * Level1 constructor
//    *
//    * @constructor
//    */
//   let Level1 = function () {
//     GameLevel.call(this)
//
//     /**
//      *
//      * @type {number}
//      */
//     this.delay = 2
//
//     /**
//      *
//      * @type {number}
//      */
//     this.time_passed = 0
//
//     /**
//      *
//      * @type {number}
//      */
//     this.circle_radius = 20
//
//     /**
//      *
//      * @type {null}
//      */
//     this.lerp_to = null
//   }
//
//   extend(Level1, GameLevel)
//
//   /**
//    * onStart callback
//    */
//   Level1.prototype.onInit = function () {
//     GameLevel.prototype.onStart.call(this)
//
//     /**
//      * @type {Circle}
//      */
//     this.circle = new Circle(this.circle_radius)
//
//     /**
//      * @type {PIXI.TextStyle}
//      */
//     let textStyle = new PIXI.TextStyle({
//       fontFamily: 'Helvetica',
//       fontSize: 20,
//       fill: ['#ffffff'],
//     })
//
//     /*
//      * @type {PIXI.Text}
//      */
//     this.richText = new PIXI.Text('Move your mouse', textStyle)
//     this.richText.x = this.app.renderer.screen.width / 2 - this.richText.width / 2
//
//     this.addChild(this.richText)
//     this.addChild(this.circle)
//   }
//
//   /**
//    * Handle the mousemove event
//    *
//    * @param {PIXI.interaction.InteractionEvent} event - The event for mousemove
//    */
//   Level1.prototype.onMouseMove = function (event) {
//     let pos = event.data.global
//     this.lerp_to = pos
//   }
//
//   /**
//    * Update the game scene.
//    *
//    * @param {number} delta - the time passed since last tick.
//    */
//   Level1.prototype.update = function (delta) {
//     GameLevel.prototype.update.call(this, delta)
//     this.circle.update(delta)
//
//     this.time_passed += delta
//     if (this.time_passed > this.delay) {
//
//       if (this.lerp_to) {
//         this.circle.position.x = lerp(this.circle.position.x, this.lerp_to.x, 0.3)
//         this.circle.position.y = lerp(this.circle.position.y, this.lerp_to.y, 0.3)
//       }
//
//       this.time_passed = 0
//     }
//   }
//
//   return Level1
// })
