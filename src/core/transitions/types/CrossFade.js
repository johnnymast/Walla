const TransactionType = require('./TransactionType')
const Scene = require('core/Scene')

class CrossFade extends TransactionType {

  /**
   * @classdesc CrossFade
   * @exports  core/transitions/types/CrossFade
   * @class
   */
  constructor (options) {
    super(options)

    /**
     *
     * @type {number}
     */
    this.delay = options.delay || 2

    /**
     *
     * @type {number}
     */
    this.time_passed = 0

    /**
     * The fade type. For now only fade in.
     *
     * @type {string}
     */
    this.type = 'in'

    /**
     * Increment size per tick.
     *
     * @type {number}
     */
    this.stepSize = 0.05

    /**
     * Indicator if the fade animation is going.
     *
     * @type {boolean}
     */
    this.isFading = false
  }

  /**
   * Animate the transition.
   */
  animate () {

    let from = this.getFrom()
    let to = this.getTo()

    if (!from instanceof Scene || !to instanceof Scene) {
      throw new Error('ScrollFrom::animate: FROM or TO are not Scenes.')
    }

    this.app.stage.addChild(to)
    this.app.stage.swapChildren(from, to)

    to.x = from.x
    to.y = from.y

    if (this.type === 'in') {
      to.alpha = 0
    }

    this.isFading = true
  }

  /**
   * This update function is called every tick
   *
   * @param {number} delta - Tick delta
   */
  update (delta) {

    if (this.isFading) {
      this.time_passed += delta

      if (this.time_passed > this.delay) {
        this._from.alpha -= this.stepSize
        this._to.alpha += this.stepSize

        if (this.type === 'in') {
          if (this._to.alpha >= 1) {
            this._to.alpha = 1
            this.emitAnimationComplete()
            this.isFading = false
          }
        }

        /**
         * Reset the time that has passed
         * since the last update.
         *
         * @type {number}
         */
        this.time_passed = 0
      }
    }
  }
}

module.exports = CrossFade
