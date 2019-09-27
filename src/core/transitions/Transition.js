/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

/**
 * Transition.
 * @class Prophecy.Transition
 */
class Transition {

  /**
   * Load the scrollFrom transaction.
   *
   * @returns {ScrollFrom}
   * @constructor
   */
  static get ScrollFrom () {
    return require('core/transitions/types/ScrollFrom')
  }

  /**
   * Load the CrossFade transaction.
   *
   * @returns {ScrollFrom}
   * @constructor
   */
  static get CrossFade () {
    return require('core/transitions/types/CrossFade')
  }

  /**
   * Factory create the transition.
   *
   * @param {string} type - The transition type.
   * @param {object} options - The options for this transition.
   */
  named (type = 'ScrollFromTop', options = {}) {

    if (!typeof this[type]) {
      throw new Error('Transition::named: Unknown transaction type.')
    }

    let _class = this[type]

    return new _class(options)
  }
}

module.exports = new Transition