/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const TransactionType = require('./TransactionType')
const TweenJS = require('tweenjs')
const Scene = require('core/Scene')

/**
 * ScrollFrom transitions.
 * @extends TransactionType
 */
class ScrollFrom extends TransactionType {

  /**
   * ScrollFrom constructor.
   * @param {object} options - The options for this transition.
   */
  constructor (options) {
    super(options)

    /**
     * The direction to scroll in.
     * @type {string}
     * @default 'top'
     */
    this.direction = (options.direction || 'top').toLowerCase()

    /**
     * Scroll duration.
     * @type {number}
     * @default 500
     */
    this.duration = options.duration || 500

    /**
     * TweenJS easing type.
     * @type {*}
     */
    this.ease = options.ease || TweenJS.Easing.Circular.In
  }

  /**
   * Animate the transition.
   *
   * @returns {Promise<unknown>}
   */
  animate () {

    let from = this.getFrom()
    let to = this.getTo()

    if (!from instanceof Scene || !to instanceof Scene) {
      throw new Error('ScrollFrom::animate: FROM or TO are not Scenes.')
    }

    this.app.stage.addChild(to)

    switch (this.direction) {
      case 'top':
        this._animateTop(from, to)
        break
      case 'bottom':
        this._animateBottom(from, to)
        break
      case 'left':
        this._animateLeft(from, to)
        break
      case 'right':
        this._animateRight(from, to)
        break

      default:
        throw new Error('ScrollFrom::animate: Unknown animation direction.')
    }
  }

  /**
   * Animate from the top of the screen.
   *
   * @param {Scene} from - The from scene.
   * @param {Scene} to - the to scene.
   * @returns {*}
   * @private
   */
  _animateTop (from, to) {
    let start = { x: 0, y: -from.height, useTicks: false }
    let end = { y: from.y }
    return this._tween(start, end, () => {
      to.y = start.y
      from.y = to.y + to.height
    })
  }

  /**
   * Animate from the bottom of the screen.
   *
   * @param {Scene} from - The from scene.
   * @param {Scene} to - the to scene.
   * @returns {*}
   * @private
   */
  _animateBottom (from, to) {
    let start = { x: 0, y: from.height, useTicks: false }
    let end = { y: -from.y }
    return this._tween(start, end, () => {
      to.y = start.y
      from.y = to.y - to.height
    })
  }

  /**
   * Animate from the left of the screen.
   *
   * @param {Scene} from - The from scene.
   * @param {Scene} to - the to scene.
   * @returns {*}
   * @private
   */
  _animateLeft (from, to) {
    let start = { x: -from.width, y: from.y, useTicks: false }
    let end = { x: from.x }
    return this._tween(start, end, () => {
      to.x = start.x
      from.x = to.x + to.width
    })
  }

  /**
   * Animate from the right of the screen.
   *
   * @param {Scene} from - The from scene.
   * @param {Scene} to - the to scene.
   * @returns {*}
   * @private
   */
  _animateRight (from, to) {
    let start = { x: from.x, y: from.y, useTicks: false }
    let end = { x: -from.width }

    return this._tween(start, end, () => {
      from.x = start.x
      to.x = from.x + from.width
    })
  }

  /**
   * Tween the scenes to their now positions.
   *
   * @param {object} start - The start coordinate.
   * @param {object} end - The end coordinate.
   * @param {callback} update_callback - The function to update every step of the Tween.
   * @returns {*}
   * @private
   */
  _tween (start, end, update_callback) {

    if (!update_callback instanceof Function) {
      throw new Error('ScrollFrom::_tween: Unknown update callback')
    }

    return new TweenJS.Tween(start)
      .to(end, this.duration)
      .easing(this.ease)
      .onUpdate(update_callback)
      .onComplete(() => {
        this.emitAnimationComplete()
      }).start()
  }

  /**
   * This update function is called every tick
   *
   * @param {number} delta - Time difference since last update.
   */
  update (delta) {
    TweenJS.update()
  }
}

module.exports = ScrollFrom
