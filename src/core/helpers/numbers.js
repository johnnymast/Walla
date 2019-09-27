/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

/**
 * Generate a random number between given min and max.
 *
 * @param {number} min - the minimum value
 * @param {number} max - the maximum value
 * @returns {*}
 */
window.rand = function rand (min, max) {
  return Math.random() * (max - min) + min
}