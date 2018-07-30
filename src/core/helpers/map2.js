/**
 * Remap a value of a number in a range to a value in
 * a different range.
 *
 * Special thanks to:
 * https://rosettacode.org/wiki/Map_range#JavaScript
 *
 * @param {array} from
 * @param {array} to
 * @param {number} s
 * @returns {number}
 */
window.map2 = function(from = [], to = [], s = 0) {
  if (!(from instanceof Array) || from.length !== 2)
    throw new Error('map2: Type error, parameter from should be an array with 2 values.')

  if (!(to instanceof Array)  || to.length !== 2)
    throw new Error('map2: Type error, parameter to should be an array with 2 values.')

  return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
};