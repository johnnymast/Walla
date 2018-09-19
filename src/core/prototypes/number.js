
/**
 * Constrain a value between a minimum and maximum value.
 *
 * @param {number} [min=0]
 * @param {number} [max=0]
 */
Number.prototype.constrain = function (min = 0, max = 0) {
  if (min === 0 && max === 0) {
    return this
  }
  return Math.max(Math.min(this, max), min)
}