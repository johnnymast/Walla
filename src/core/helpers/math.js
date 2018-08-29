/**
 * @module Helpers
 * @submodule Math
 */

/**
 * Constrain a value between a minimum and maximum value.
 *
 * @param {number} [n=0]
 * @param {number} [min=0]
 * @param {number} [max=0]
 */
window.constrain = function (n = 0, min = 0, max = 0) {
  return Math.max(Math.min(n, max), min)
}

