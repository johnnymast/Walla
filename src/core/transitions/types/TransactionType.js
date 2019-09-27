/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const Scene = require('core/Scene')

/**
 * TransactionType transitions.
 * @extends Scene
 */
class TransactionType extends Scene {

  /**
   * Constructor
   *
   * @param {Object} props - The options for the transitions.
   */
  constructor (props) {
    super(props)

    /**
     * The scene to transition from.
     * @type {Scene}
     * @default null
     * @private
     */
    this._from = null

    /**
     * The scene to transition to.
     * @type {Scene}
     * @default null
     * @private
     */
    this._to = null

    this.init()
    this.start()
  }

  /**
   * Set the old scene.
   *
   * @param {Scene} from - The old scene.
   * @returns {TransactionType}
   */
  setFrom (from) {
    this._from = from
    return this
  }

  /**
   * Set the new scene.
   *
   * @param {Scene} to - The new scene.
   * @returns {TransactionType}
   */
  setTo (to) {
    this._to = to
    return this
  }

  /**
   * Return the old scene
   *
   * @returns {Scene}
   */
  getFrom () {
    return this._from
  }

  /**
   * Return the new scene
   *
   * @returns {Scene}
   */
  getTo () {
    return this._to
  }

  /**
   * Animate the transition.
   *
   * @returns {*|Promise<any>|Animation}
   */
  animate () {
    return super.animate()
  }

  /**
   * Notify parent that the animation is complete
   * and the scenes are completely transitioned.
   */
  emitAnimationComplete () {
    this.emit('animation_complete', this)
  }
}

module.exports = TransactionType