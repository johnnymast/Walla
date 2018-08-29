/**
 * Gestures
 * @namespace Gestures
 */
const Pinch = require('core/gestures/types/Pinch')

/**
 * Add gestures to a object.
 *
 * @param {PIXI.DisplayObject} object - the object to interact with.
 * @constructor
 */
let Gestures = function (object) {
  this._object = object
  this._pinch = null
}

Gestures.prototype = {
  constructor: Gestures,

  /**
   *
   * @param {boolean} [enabled = true] - enable pinching or not.
   * @param {array} [args = null] - optional array with 2 values minzoom and maxzoom.
   * @returns {Gesture}
   */
  pinchable: function (enabled = true, args) {
    if (!this._pinch) {
      this._pinch = new Pinch(this._object, args)
    }
    this._pinch.enabled = true
    return this
  }
}


if (typeof module !== 'undefined') {
  module.exports = Gestures
}