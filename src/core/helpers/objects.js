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

// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
window.extend2 = function () {

  // Variables
  let extended = {}
  let deep = false
  let i = 0
  let length = arguments.length

  // Check if a deep merge
  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0]
    i++
  }

  // Merge the object into the extended object
  let merge = function (obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        // If deep merge and property is an object, merge properties
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend2(true, extended[prop], obj[prop])
        } else {
          extended[prop] = obj[prop]
        }
      }
    }
  }

  // Loop through each object and conduct a merge
  for (; i < length; i++) {
    let obj = arguments[i]
    merge(obj)
  }

  return extended
}

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

/**
 * Remap a value of a number in a range to a value in
 * a different range.
 *
 * Special thanks to:
 * https://rosettacode.org/wiki/Map_range#JavaScript
 *
 * @param {array} from - the from range
 * @param {array} to - the to range
 * @param {number} n - the number
 * @returns {number}
 */
window.map2 = function (from = [], to = [], n = 0) {
  if (!(from instanceof Array) || from.length !== 2)
    throw new Error('map2: Type error, parameter from should be an array with 2 values.')

  if (!(to instanceof Array) || to.length !== 2)
    throw new Error('map2: Type error, parameter to should be an array with 2 values.')

  return to[0] + (n - from[0]) * (to[1] - to[0]) / (from[1] - from[0])
}