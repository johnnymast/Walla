const GameLevel = require('screens/RoundedRects/GameLevel')
const RoundedRect = require('objects/RoundedRects/RoundedRect')
const Text = require('objects/RoundedRects/Text')
const PIXI = require('pixi')

class Level1 extends GameLevel {
  constructor () {
    super()

    /**
     *
     * @type {Array}
     */
    this.rectangles = []

    /**
     *
     * @type {number}
     */
    this.delay = 0.5

    /**
     *
     * @type {number}
     */
    this.time_passed = 0

    /**
     *
     * @type {number}
     */
    this.alpha_decay = 0.05

    /**
     *
     * @type {number}
     */
    this.scale_decay = 0.05

    /**
     *
     * @type {boolean}
     */
    this.mouse_down = false

    /**
     * Make the lever intractable
     * via mouse input.
     *
     * @type {boolean}
     */
    this.interactive = true
  }

  /**
   * onStart callback
   */
  onInit () {
    super.onInit()

    this.text = new Text('Click and drag')
    this.text.x = this.app.screen.width / 2 - this.text.width / 2
    this.text.y = this.app.screen.height / 2 - this.text.height / 2

    this.addChild(this.text)

    var style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 18,
      fill: ['#ffffff'],
    })
    this.rect_count = new PIXI.Text('Rects: ' + this.rectangles.length, style)
    this.rect_count.x = this.statistics.x
    this.rect_count.y = this.statistics.y - this.statistics.height //- 5

    this.addChild(this.rect_count)
  }

  /**
   * Handle the mousemove event
   *
   * @param {PIXI.interaction.InteractionEvent} event - The event for mousemove
   */
  onMouseMove (event) {
    if (this.mouse_down) {
      let pos = event.data.global

      let rect = new RoundedRect()
      LocalStorage.set(pos.x, pos.y)

      this.rectangles.push(rect)
      this.addChild(rect)
    }
  }

  /**
   * Handle the pointerdowm event
   * @param {PIXI.interaction.InteractionEvent} event - The event for pointerdown
   */
  onPointerDown (event) {
    this.mouse_down = true
  }

  /**
   * Handle the pointerup event
   * @param {PIXI.interaction.InteractionEvent} event - The event for pointerup
   */
  onPointerUp (event) {
    this.mouse_down = false
  }

  /**
   * Update the game scene.
   *
   * @param {number} delta - the time passed since last tick.
   */
  update (delta) {
    GameLevel.prototype.update.call(this, delta)

    this.time_passed += delta
    if (this.time_passed > this.delay) {

      /**
       * Reset the time that has passed
       * since the last update.
       *
       * @type {number}
       */
      this.time_passed = 0

      for (let i = 0; i < this.rectangles.length; i++) {
        let item = this.rectangles[i]

        /**
         * If the item is invisible remove
         * it from the array.
         */
        if (item.alpha < 0) {
          this.removeChild(item)
          this.rectangles.splice(i, 1)
        }

        item.alpha -= this.alpha_decay
      }

      if (this.mouse_down) {
        let new_scale = this.text.scale.x - this.scale_decay
        if (new_scale < 0)
          new_scale = 0

        this.text.visible = (new_scale > 0)
        LocalStorage.set(new_scale)

      } else {

        if (this.text.scale.x < 1) {
          let new_scale = this.text.scale.x + this.scale_decay
          if (new_scale > 1)
            new_scale = 1

          this.text.visible = (new_scale > 0)
          LocalStorage.set(new_scale)
        }
      }

      this.rect_count.text = 'Rects: ' + this.rectangles.length
    }
  }
}

module.exports = Level1
