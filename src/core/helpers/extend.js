/**
 * @namespace Helper functions
 */

/**
 * Extend a flat object.
 *
 * @param {object} src - extend the dest object with this src object
 * @param {object} dest - extend the this object with the src object
 */
window.extend = function (src, dest) {
  src.prototype = Object.create(dest.prototype)
  src.prototype.constructor = src
  src.prototype.super = dest.prototype
}
