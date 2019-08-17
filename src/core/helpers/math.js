/**
 * @module Helpers
 * @submodule Math
 */

/**
 * Constrain a value between a minimum and maximum value.
 * This function sometimes has the name minmax()
 *
 * @param {number} [n=0] - The current value
 * @param {number} [min=0] - The minimal value
 * @param {number} [max=0] - The maximum value
 */
window.constrain = function (n = 0, min = 0, max = 0) {
  return Math.max(Math.min(n, max), min)
}

/**
 * Linear interpolate start value to the stop value.
 * and add x percentage of amt's value.
 *
 * @param {number} [start=0] - the initial value.
 * @param {number} [stop=0] - destination value.
 * @param {number} [amt=0] - the distance
 *
 * @returns {number} The calculated value.
 */
window.lerp = function (start = 0, stop = 0, amt = 0) {
  return amt * (stop - start) + start
}

