/**
 * @namespace Helper functions
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