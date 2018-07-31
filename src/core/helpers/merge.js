/**
 * @namespace Helper functions
 */

/**
 * Merge 2 values
 *
 * @param {object} src - the source object
 * @param {object} dest - the destination object
 * @returns {any}
 */
window.merge = function (src, dest) {
  return Object.assign(src, dest)
}