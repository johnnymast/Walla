/**
 * Extensions to number object
 *
 * @namespace Extensions
 */

/**
 * Normalize a value between a mix and a max.
 *
 * @param min
 * @param max
 * @returns {number}
 */
Number.prototype.normalize = function (min, max) {
  return (this - min) / (max - min)
}

/**
 * De normalize a value back to its original.
 *
 * @param min
 * @param max
 * @returns {number}
 */
Number.prototype.denormalize = function (min, max) {
  return (this * (max - min) + min);
}