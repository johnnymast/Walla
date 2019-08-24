const Scene = require('core/Scene')

class TransactionType extends Scene {

  /**
   * Constructor
   *
   * @param {Object} props - The options for the transitions.
   */
  constructor (props) {
    super(props)
    this._from = null
    this._to = null
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